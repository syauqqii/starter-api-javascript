const { Permission } = require('../models');

class PermissionService {
    static async create(resource, action, description) {
        const attribute = `${resource}:${action}`;

        const existing = await Permission.findOne({ where: { attribute } });
        if (existing) {
            throw new Error('Permission attribute already exists');
        }

        const permission = await Permission.create({
            resource,
            action,
            attribute,
            description
        });

        return permission;
    }

    static async findAll() {
        return Permission.findAll({
            order: [['resource', 'ASC'], ['action', 'ASC']]
        });
    }

    static async findById(id) {
        const permission = await Permission.findByPk(id);

        if (!permission) {
            throw new Error('Permission not found');
        }

        return permission;
    }

    static async findByAttribute(attribute) {
        const permission = await Permission.findOne({ where: { attribute } });

        if (!permission) {
            throw new Error('Permission not found');
        }

        return permission;
    }

    static async update(id, data) {
        const permission = await Permission.findByPk(id);

        if (!permission) {
            throw new Error('Permission not found');
        }

        // Update attribute if resource or action changes
        const resource = data.resource || permission.resource;
        const action = data.action || permission.action;
        const newAttribute = `${resource}:${action}`;

        if (newAttribute !== permission.attribute) {
            const existing = await Permission.findOne({ where: { attribute: newAttribute } });
            if (existing) {
                throw new Error('Permission attribute already exists');
            }
            data.attribute = newAttribute;
        }

        if (data.resource) permission.resource = data.resource;
        if (data.action) permission.action = data.action;

        await permission.update(data);
        return permission;
    }

    static async delete(id) {
        const permission = await Permission.findByPk(id);

        if (!permission) {
            throw new Error('Permission not found');
        }

        await permission.destroy();
        return { message: 'Permission deleted successfully' };
    }

    static async bulkCreate(permissions) {
        const created = [];
        for (const perm of permissions) {
            const attribute = `${perm.resource}:${perm.action}`;
            const existing = await Permission.findOne({ where: { attribute } });

            if (!existing) {
                const permission = await Permission.create({
                    resource: perm.resource,
                    action: perm.action,
                    attribute,
                    description: perm.description
                });
                created.push(permission);
            }
        }
        return created;
    }
}

module.exports = PermissionService;
