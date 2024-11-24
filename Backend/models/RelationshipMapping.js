
const User = require('./User');
const Role = require('./Role');
const Permission = require('./Permission');
const RolePermission = require('./RolePermission');
const UserPermission = require('./UserPermission');

console.log("Hiiiii");

// 1. User ↔ Role (One-to-Many)
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });

// 2. Role ↔ Permission (Many-to-Many)
Role.belongsToMany(Permission, { through: RolePermission });
Permission.belongsToMany(Role, { through: RolePermission });

/*
Permission
id name role 
1   read  [{id: 1, name, manager}, {id:2, name: admin}]
    Rolepermisiion 
    role_id  permission_id
    1  1
    1  2
*/


// 3. User ↔ Permission (Many-to-Many for Overrides)
User.belongsToMany(Permission, { through: UserPermission });
Permission.belongsToMany(User, { through: UserPermission });
