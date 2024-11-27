const Permission = require("../models/Permission");
const Role = require("../models/Role")
const User = require("../models/User")

const getAllUsers = async (req, res, next) => {
    const users = await User.findAll({ include: [Role, Permission] });
    res.status(200).json(users);
}

const getUser = async (req, res, next) => {
    if (req.query.id) {
        const user = await getUserById(req.query.id);
        return res.json(user);
    }
    res.status(404);
}

const getUserById = async (id) => {
    return await User.findByPk(id, { include: [Role, Permission] });
}

const addUsers = async (req, res, next) => {
    try {
        const users = await User.create(req.body);
        return res.status(201).json(users);
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                status: 'Duplicate Entry',
                message: 'Validation failed',
            });
        }
        return res.status(500).json("Internal Error");
    }

}

const editUser = async (req, res, next) => {
    console.log(req.body);
    const [isUpdated] = await User.update(req.body, { where: { id: req.params.id } });
    if (isUpdated) {
        const user = await getUserById(req.params.id);
        return res.status(200).json(user);
    }
    res.status(500);
}

const deleteUser = async (req, res, next) => {
    const isDeleted = await User.destroy({ where: { id: req.params.id } });
    if (isDeleted)
        res.status(200).json({ message: "deleted successfully" });
    else
        res.status(500).json({ message: "unable to delete" });
}

module.exports = { getAllUsers, addUsers, getUser, editUser, deleteUser }