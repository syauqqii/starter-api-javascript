const PermissionService = require('../services/permission.service');
const PermissionDto = require('../dtos/permission.dto');
const { ResponseUtil } = require('../utils');

class PermissionController {
    static async Create(req, res) {
        try {
            const { resource, action, description } = PermissionDto.create(req.body);
            const result = await PermissionService.create(resource, action, description);
            return res.status(201).json(ResponseUtil.Created(result, 'Permission created successfully'));
        } catch (error) {
            if (error.message.includes('already exists')) {
                return res.status(409).json(ResponseUtil.Conflict(error.message));
            }
            return res.status(400).json(ResponseUtil.BadRequest(error.message));
        }
    }

    static async GetAll(req, res) {
        try {
            const result = await PermissionService.findAll();
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            return res.status(500).json(ResponseUtil.InternalServerError(error.message));
        }
    }

    static async GetById(req, res) {
        try {
            const result = await PermissionService.findById(req.params.id);
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            return res.status(404).json(ResponseUtil.NotFound(error.message));
        }
    }

    static async Update(req, res) {
        try {
            const data = PermissionDto.update(req.body);
            const result = await PermissionService.update(req.params.id, data);
            return res.status(200).json(ResponseUtil.Ok(result, 'Permission updated successfully'));
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
            const result = await PermissionService.delete(req.params.id);
            return res.status(200).json(ResponseUtil.Ok(result));
        } catch (error) {
            return res.status(404).json(ResponseUtil.NotFound(error.message));
        }
    }

    static async BulkCreate(req, res) {
        try {
            const permissions = req.body.permissions;
            if (!Array.isArray(permissions)) {
                return res.status(400).json(ResponseUtil.BadRequest('Permissions must be an array'));
            }
            const result = await PermissionService.bulkCreate(permissions);
            return res.status(201).json(ResponseUtil.Created(result, `${result.length} permissions created`));
        } catch (error) {
            return res.status(400).json(ResponseUtil.BadRequest(error.message));
        }
    }
}

module.exports = PermissionController;
