const Joi = require('joi');

class RoleDto {
    static create(data) {
        const schema = Joi.object({
            name: Joi.string().min(2).max(50).required().messages({
                'string.min': 'Role name must be at least 2 characters',
                'string.max': 'Role name cannot exceed 50 characters',
                'any.required': 'Role name is required'
            }),
            description: Joi.string().max(255).allow('', null).messages({
                'string.max': 'Description cannot exceed 255 characters'
            })
        });

        const { error, value } = schema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return value;
    }

    static update(data) {
        const schema = Joi.object({
            name: Joi.string().min(2).max(50).messages({
                'string.min': 'Role name must be at least 2 characters',
                'string.max': 'Role name cannot exceed 50 characters'
            }),
            description: Joi.string().max(255).allow('', null).messages({
                'string.max': 'Description cannot exceed 255 characters'
            }),
            isActive: Joi.boolean()
        }).min(1);

        const { error, value } = schema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return value;
    }

    static assignPermission(data) {
        const schema = Joi.object({
            roleId: Joi.string().uuid().required().messages({
                'string.uuid': 'Invalid role ID format',
                'any.required': 'Role ID is required'
            }),
            permissionId: Joi.string().uuid().required().messages({
                'string.uuid': 'Invalid permission ID format',
                'any.required': 'Permission ID is required'
            })
        });

        const { error, value } = schema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return value;
    }
}

module.exports = RoleDto;
