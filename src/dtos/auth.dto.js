const Joi = require('joi');

class AuthDto {
    static register(data) {
        const schema = Joi.object({
            username: Joi.string().min(3).max(50).required().messages({
                'string.min': 'Username must be at least 3 characters',
                'string.max': 'Username cannot exceed 50 characters',
                'any.required': 'Username is required'
            }),
            email: Joi.string().email().required().messages({
                'string.email': 'Invalid email format',
                'any.required': 'Email is required'
            }),
            password: Joi.string().min(8).required().messages({
                'string.min': 'Password must be at least 8 characters',
                'any.required': 'Password is required'
            })
        });

        const { error, value } = schema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return value;
    }

    static login(data) {
        const schema = Joi.object({
            email: Joi.string().email().required().messages({
                'string.email': 'Invalid email format',
                'any.required': 'Email is required'
            }),
            password: Joi.string().required().messages({
                'any.required': 'Password is required'
            })
        });

        const { error, value } = schema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return value;
    }

    static refreshToken(data) {
        const schema = Joi.object({
            refreshToken: Joi.string().required().messages({
                'any.required': 'Refresh token is required'
            })
        });

        const { error, value } = schema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return value;
    }

    static assignRole(data) {
        const schema = Joi.object({
            userId: Joi.string().uuid().required().messages({
                'string.uuid': 'Invalid user ID format',
                'any.required': 'User ID is required'
            }),
            roleId: Joi.string().uuid().required().messages({
                'string.uuid': 'Invalid role ID format',
                'any.required': 'Role ID is required'
            })
        });

        const { error, value } = schema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return value;
    }

    static removeRole(data) {
        const schema = Joi.object({
            userId: Joi.string().uuid().required().messages({
                'string.uuid': 'Invalid user ID format',
                'any.required': 'User ID is required'
            }),
            roleId: Joi.string().uuid().required().messages({
                'string.uuid': 'Invalid role ID format',
                'any.required': 'Role ID is required'
            })
        });

        const { error, value } = schema.validate(data);
        if (error) {
            throw new Error(error.details[0].message);
        }
        return value;
    }
}

module.exports = AuthDto;
