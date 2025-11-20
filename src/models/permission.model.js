const { DataTypes } = require('sequelize');
const database = require('../../database');

const Permission = database.define('Permission', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    resource: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: 'Resource name (e.g., user, post, comment)'
    },
    action: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: 'Action name (e.g., create, read, update, delete)'
    },
    attribute: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: 'Combined attribute (e.g., user:create, post:delete)'
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'permissions',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['resource', 'action']
        }
    ]
});

module.exports = Permission;
