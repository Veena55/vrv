const Permission = require("../models/Permission");
const User = require("../models/User");
const Role = require("../models/Role");
const { Sequelize } = require("sequelize");

const getAllPermissions = async (req, res, next) => {
    const permissions = await Permission.findAll({
        include: [Role, User], attributes: {
            include: [
                // Format updatedAt date to 'YYYY-MM-DD' (or any format you prefer)
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('Permission.updatedAt'), '%Y-%m-%d'), 'updatedAt']
            ]
        }
    });
    res.status(200).json(permissions);
}

const getPermission = async (req, res, next) => {
    if (req.query.id) {
        const permission = await getPermissionById(req.query.id);
        return res.json(permission);
    }
    res.status(404);
}

const getPermissionById = async (id) => {
    return await Permission.findByPk(id, { include: [Role, User] });
}

const addPermissions = async (req, res, next) => {
    const permissions = await Permission.create(req.body);
    res.status(201).json(permissions);
}

const editPermission = async (req, res, next) => {
    const [isUpdated] = await Permission.update(req.body, { where: { id: req.params.id } });
    if (isUpdated) {
        const permission = await getPermissionById(req.params.id);
        return res.status(200).json(permission);
    }
    res.status(500);
}

const deletePermission = async (req, res, next) => {
    const isDeleted = await Permission.destroy({ where: { id: req.params.id } });
    if (isDeleted)
        res.status(200).json({ message: "deleted successfully" });
    else
        res.status(500).json({ message: "unable to delete" });
}

module.exports = { getAllPermissions, addPermissions, getPermission, editPermission, deletePermission }