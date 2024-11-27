const { Sequelize } = require("sequelize");
const Permission = require("../models/Permission");
const Role = require("../models/Role");
const User = require("../models/User");
const RolePermission = require("../models/RolePermission");

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

const addRoles = async (req, res) => {
    const { roleName, permissions } = req.body;

    try {
        // Create the role
        const newRole = await Role.create({ roleName });

        // Assign multiple permissions
        if (permissions && permissions.length > 0) {
            const rolePermissions = permissions.map(permissionId => ({
                RoleId: newRole.id,
                PermissionId: permissionId,
            }));
            await RolePermission.bulkCreate(rolePermissions); // Sequelize bulk insert
        }

        res.status(201).json({ message: 'Role created successfully', role: newRole });
    } catch (error) {
        console.error('Error creating role:', error);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                status: 'Duplicate Entry',
                message: 'Validation failed',
            });
        }
        res.status(500).json({ error: 'Failed to create role' });
    }
};


const editRole = async (req, res, next) => {
    const { roleName, permissions } = req.body;
    const [isUpdated] = await Role.update({ roleName }, { where: { id: req.params.id } });
    if (isUpdated && permissions && permissions.length > 0) {
        await RolePermission.destroy({
            where: {
                roleId: req.params.id
            }
        });
        const rolePermissions = permissions.map(permissionId => ({
            RoleId: req.params.id,
            PermissionId: permissionId,
        }));
        await RolePermission.bulkCreate(rolePermissions); // Sequelize bulk insert
        res.status(200).json("success");
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