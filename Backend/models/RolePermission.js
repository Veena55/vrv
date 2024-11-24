const db = require('../db');

const RolePermission = db.define('RolePermission', {}, { timestamps: true });

module.exports = RolePermission;
