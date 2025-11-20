const RoleService = require('../services/role.service');
const RoleDto = require('../dtos/role.dto');
const { ResponseUtil } = require('../utils');

class RoleController {
    static async Create(req, res) {
        try {
            const { name, description } = RoleDto.create(req.body);
            const result = await RoleService.create(name, description);
            return res.status(201).json(ResponseUtil.Created(result, 'Role created successfully'));
        } catch (error) {
            if (error.message.includes('already exists')) {
                return res.status(409).json(ResponseUtil.Conflict(error.message));
            }
            return res.status(400).json(ResponseUtil.BadRequest(error.message));
        }
    }

    static async GetAll(req, res) {
        try {
            const result = await RoleService.findAll();
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            return res.status(500).json(ResponseUtil.InternalServerError(error.message));
        }
    }

    static async GetById(req, res) {
        try {
            const result = await RoleService.findById(req.params.id);
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            return res.status(404).json(ResponseUtil.NotFound(error.message));
        }
    }

    static async Update(req, res) {
        try {
            const data = RoleDto.update(req.body);
            const result = await RoleService.update(req.params.id, data);
            return res.status(200).json(ResponseUtil.Ok(result, 'Role updated successfully'));
        } catch (error) {
            if (error.message.includes('not found')) {
                return res.status(404).json(ResponseUtil.NotFound(error.message));
            }
            if (error.message.includes('already exists')) {
                return res.status(409).json(ResponseUtil.Conflict(error.message));
            }
            return res.status(400).json(ResponseUtil.BadRequest(error.message));
        }
    }

    static async Delete(req, res) {
        try {
            const result = await RoleService.delete(req.params.id);
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            return res.status(404).json(ResponseUtil.NotFound(error.message));
        }
    }

    static async AssignPermission(req, res) {
        try {
            const { roleId, permissionId } = RoleDto.assignPermission(req.body);
            const result = await RoleService.assignPermission(roleId, permissionId);
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            if (error.message.includes('not found')) {
                return res.status(404).json(ResponseUtil.NotFound(error.message));
            }
            if (error.message.includes('already')) {
                return res.status(409).json(ResponseUtil.Conflict(error.message));
            }
            return res.status(400).json(ResponseUtil.BadRequest(error.message));
        }
    }

    static async RemovePermission(req, res) {
        try {
            const { roleId, permissionId } = RoleDto.assignPermission(req.body);
            const result = await RoleService.removePermission(roleId, permissionId);
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            return res.status(404).json(ResponseUtil.NotFound(error.message));
        }
    }

    static async GetPermissions(req, res) {
        try {
            const result = await RoleService.getRolePermissions(req.params.id);
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            return res.status(404).json(ResponseUtil.NotFound(error.message));
        }
    }
}

module.exports = RoleController;
