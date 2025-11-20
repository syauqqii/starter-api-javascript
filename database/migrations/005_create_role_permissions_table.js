'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('role_permissions', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            role_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            permission_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'permissions',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            conditions: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: 'ABAC conditions for this role-permission combination',
            },
            granted_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });

        await queryInterface.addIndex('role_permissions', ['role_id', 'permission_id'], {
            unique: true,
            name: 'role_permissions_role_permission_unique',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('role_permissions');
    }
};
