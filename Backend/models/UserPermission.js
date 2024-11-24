const db = require('../db');

const UserPermission = db.define('UserPermission', {}, { timestamps: true });

module.exports = UserPermission;
