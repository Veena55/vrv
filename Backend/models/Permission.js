const { DataTypes } = require('sequelize');
const db = require('../db');

const Permission = db.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    permissionName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, { timestamps: true });

module.exports = Permission;