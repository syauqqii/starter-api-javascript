/**
 * Database Seeder - Initialize default roles, permissions, and admin user
 * Run this after first database sync: node database/seeders/init.seeder.js
 */

require('dotenv').config();
const database = require('../index');
const { User, Role, Permission, UserRole, RolePermission } = require('../../src/models');
const { PasswordUtil } = require('../../src/utils');

const defaultPermissions = [
    // User permissions
    { resource: 'user', action: 'create', description: 'Create new users' },
    { resource: 'user', action: 'read', description: 'View user details' },
    { resource: 'user', action: 'update', description: 'Update user information' },
    { resource: 'user', action: 'delete', description: 'Delete users' },
    { resource: 'user', action: 'manage', description: 'Manage user roles and permissions' },

    // Role permissions
    { resource: 'role', action: 'create', description: 'Create new roles' },
    { resource: 'role', action: 'read', description: 'View roles' },
    { resource: 'role', action: 'update', description: 'Update roles' },
    { resource: 'role', action: 'delete', description: 'Delete roles' },

    // Permission permissions
    { resource: 'permission', action: 'create', description: 'Create new permissions' },
    { resource: 'permission', action: 'read', description: 'View permissions' },
    { resource: 'permission', action: 'update', description: 'Update permissions' },
    { resource: 'permission', action: 'delete', description: 'Delete permissions' },
];

const defaultRoles = [
    {
        name: 'admin',
        description: 'System administrator with full access',
        permissions: ['user:create', 'user:read', 'user:update', 'user:delete', 'user:manage',
            'role:create', 'role:read', 'role:update', 'role:delete',
            'permission:create', 'permission:read', 'permission:update', 'permission:delete']
    },
    {
        name: 'moderator',
        description: 'Moderator with limited management access',
        permissions: ['user:read', 'user:update', 'role:read', 'permission:read']
    },
    {
        name: 'user',
        description: 'Regular user with basic access',
        permissions: ['user:read']
    }
];

async function seed() {
    try {
        await database.authenticate();
        console.log('Database connected');

        // Create permissions
        console.log('\nCreating permissions...');
        const createdPermissions = {};
        for (const perm of defaultPermissions) {
            const attribute = `${perm.resource}:${perm.action}`;
            const [permission] = await Permission.findOrCreate({
                where: { attribute },
                defaults: {
                    resource: perm.resource,
                    action: perm.action,
                    attribute,
                    description: perm.description
                }
            });
            createdPermissions[attribute] = permission;
            console.log(`  - ${attribute}`);
        }

        // Create roles and assign permissions
        console.log('\nCreating roles...');
        for (const roleData of defaultRoles) {
            const [role] = await Role.findOrCreate({
                where: { name: roleData.name },
                defaults: {
                    name: roleData.name,
                    description: roleData.description
                }
            });
            console.log(`  - ${roleData.name}`);

            // Assign permissions to role
            for (const permAttr of roleData.permissions) {
                const permission = createdPermissions[permAttr];
                if (permission) {
                    await RolePermission.findOrCreate({
                        where: { roleId: role.id, permissionId: permission.id },
                        defaults: { roleId: role.id, permissionId: permission.id }
                    });
                }
            }
        }

        // Create default admin user
        console.log('\nCreating default admin user...');
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        let adminUser = await User.findOne({ where: { email: adminEmail } });
        if (!adminUser) {
            const hashedPassword = await PasswordUtil.hashPassword(adminPassword);
            adminUser = await User.create({
                username: 'admin',
                email: adminEmail,
                password: hashedPassword
            });
            console.log(`  - Created admin user: ${adminEmail}`);

            // Assign admin role
            const adminRole = await Role.findOne({ where: { name: 'admin' } });
            if (adminRole) {
                await UserRole.findOrCreate({
                    where: { userId: adminUser.id, roleId: adminRole.id },
                    defaults: { userId: adminUser.id, roleId: adminRole.id }
                });
                console.log('  - Assigned admin role');
            }
        } else {
            console.log('  - Admin user already exists');
        }

        console.log('\nSeeding completed successfully!');
        console.log('\nDefault admin credentials:');
        console.log(`  Email: ${adminEmail}`);
        console.log(`  Password: ${adminPassword}`);
        console.log('\nIMPORTANT: Change the admin password after first login!\n');

        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error.message);
        process.exit(1);
    }
}

seed();
