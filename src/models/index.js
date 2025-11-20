const HelloWorldModel = require("./hello_world.model");
const User = require("./user.model");
const Role = require("./role.model");
const Permission = require("./permission.model");
const UserRole = require("./user_role.model");
const RolePermission = require("./role_permission.model");

// Set up associations
User.belongsToMany(Role, { through: UserRole, foreignKey: 'userId', otherKey: 'roleId', as: 'roles' });
Role.belongsToMany(User, { through: UserRole, foreignKey: 'roleId', otherKey: 'userId', as: 'users' });

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId', otherKey: 'permissionId', as: 'permissions' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId', otherKey: 'roleId', as: 'roles' });

module.exports = {
    HelloWorldModel,
    User,
    Role,
    Permission,
    UserRole,
    RolePermission
};
