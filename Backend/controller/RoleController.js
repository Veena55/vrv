const { Sequelize } = require("sequelize");
const Permission = require("../models/Permission");
const Role = require("../models/Role");
const User = require("../models/User");

const getAllRoles = async (req, res, next) => {
    const roles = await Role.findAll({
        include: [User, Permission], attributes: {
            include: [
                // Format updatedAt date to 'YYYY-MM-DD' (or any format you prefer)
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('Role.updatedAt'), '%Y-%m-%d'), 'updatedAt']
            ]
        }
    });
    res.status(200).json(roles);
}

const getRole = async (req, res, next) => {
    if (req.query.id) {
        const role = await getRoleById(req.query.id);
        return res.json(role);
    }
    res.status(404);
}

const getRoleById = async (id) => {
    return await Role.findByPk(id, {
        include: [User, Permission], attributes: {
            include: [
                // Format updatedAt date to 'YYYY-MM-DD' (or any format you prefer)
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('Role.updatedAt'), '%Y-%m-%d')]
            ]
        }
    });
}

const addRoles = async (req, res, next) => {
    const roles = await Role.create(req.body);
    res.status(201).json(roles);
}

const editRole = async (req, res, next) => {
    const [isUpdated] = await Role.update(req.body, { where: { id: req.params.id } });
    if (isUpdated) {
        const role = await getRoleById(req.params.id);
        return res.status(200).json(role);
    }
    res.status(500);
}

const deleteRole = async (req, res, next) => {
    const isDeleted = await Role.destroy({ where: { id: req.params.id } });
    if (isDeleted)
        res.status(200).json({ message: "deleted successfully" });
    else
        res.status(500).json({ message: "unable to delete" });
}

module.exports = { getAllRoles, addRoles, getRole, editRole, deleteRole }