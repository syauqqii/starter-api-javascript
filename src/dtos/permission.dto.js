const Joi = require('joi');

class PermissionDto {
    static create(data) {
        const schema = Joi.object({
            resource: Joi.string().min(2).max(50).required().messages({
                'string.min': 'Resource name must be at least 2 characters',
                'string.max': 'Resource name cannot exceed 50 characters',
                'any.required': 'Resource name is required'
            }),
            action: Joi.string().min(2).max(50).required().messages({
                'string.min': 'Action name must be at least 2 characters',
                'string.max': 'Action name cannot exceed 50 characters',
                'any.required': 'Action name is required'
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
            resource: Joi.string().min(2).max(50).messages({
                'string.min': 'Resource name must be at least 2 characters',
                'string.max': 'Resource name cannot exceed 50 characters'
            }),
            action: Joi.string().min(2).max(50).messages({
                'string.min': 'Action name must be at least 2 characters',
                'string.max': 'Action name cannot exceed 50 characters'
            }),
            description: Joi.string().max(255).allow('', null).messages({
                'string.max': 'Description cannot exceed 255 characters'
            })
        }).min(1);

        const { error, value } = schema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return value;
    }
}

module.exports = PermissionDto;
