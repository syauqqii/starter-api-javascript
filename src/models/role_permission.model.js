const { DataTypes } = require('sequelize');
const database = require('../../database');

const RolePermission = database.define('RolePermission', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    permissionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'permissions',
            key: 'id'
        }
    }
}, {
    tableName: 'role_permissions',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['role_id', 'permission_id']
        }
    ]
});

module.exports = RolePermission;
