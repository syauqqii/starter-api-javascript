'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('permissions', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            resource: {
                type: Sequelize.STRING(50),
                allowNull: false,
                comment: 'Resource name (e.g., user, role, product)',
            },
            action: {
                type: Sequelize.STRING(50),
                allowNull: false,
                comment: 'Action name (e.g., create, read, update, delete)',
            },
            attributes: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: 'Additional ABAC attributes for fine-grained control',
            },
            description: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            },
        });

        await queryInterface.addIndex('permissions', ['resource', 'action'], {
            unique: true,
            name: 'permissions_resource_action_unique',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('permissions');
    }
};
