const { Role, Permission, RolePermission } = require('../models');

class RoleService {
    static async create(name, description) {
        const existing = await Role.findOne({ where: { name } });
        if (existing) {
            throw new Error('Role name already exists');
        }

        const role = await Role.create({ name, description });
        return role;
    }

    static async findAll() {
        return Role.findAll({
            include: [{
                model: Permission,
                as: 'permissions'
            }],
            order: [['createdAt', 'DESC']]
        });
    }

    static async findById(id) {
        const role = await Role.findByPk(id, {
            include: [{
                model: Permission,
                as: 'permissions'
            }]
        });

        if (!role) {
            throw new Error('Role not found');
        }

        return role;
    }

    static async update(id, data) {
        const role = await Role.findByPk(id);

        if (!role) {
            throw new Error('Role not found');
        }

        if (data.name && data.name !== role.name) {
            const existing = await Role.findOne({ where: { name: data.name } });
            if (existing) {
                throw new Error('Role name already exists');
            }
        }

        await role.update(data);
        return role;
    }

    static async delete(id) {
        const role = await Role.findByPk(id);

        if (!role) {
            throw new Error('Role not found');
        }

        await role.destroy();
        return { message: 'Role deleted successfully' };
    }

    static async assignPermission(roleId, permissionId) {
        const role = await Role.findByPk(roleId);
        if (!role) {
            throw new Error('Role not found');
        }

        const permission = await Permission.findByPk(permissionId);
        if (!permission) {
            throw new Error('Permission not found');
        }

        const existing = await RolePermission.findOne({
            where: { roleId, permissionId }
        });

        if (existing) {
            throw new Error('Permission already assigned to role');
        }

        await RolePermission.create({ roleId, permissionId });
        return { message: `Permission '${permission.attribute}' assigned to role '${role.name}'` };
    }

    static async removePermission(roleId, permissionId) {
        const result = await RolePermission.destroy({
            where: { roleId, permissionId }
        });

        if (result === 0) {
            throw new Error('Permission assignment not found');
        }

        return { message: 'Permission removed from role' };
    }

    static async getRolePermissions(roleId) {
        const role = await Role.findByPk(roleId, {
            include: [{
                model: Permission,
                as: 'permissions'
            }]
        });

        if (!role) {
            throw new Error('Role not found');
        }

        return role.permissions;
    }
}

module.exports = RoleService;
