const Joi = require('joi');

class HelloWorldDTO {
    constructor(payload) {
        const schema = Joi.object({
            name: Joi.string().min(1).required().messages({
                'string.base': `"name" must be a string`,
                'string.empty': `"name" cannot be empty`,
                'any.required': `"name" is required`
            })
        });

        const { error, value } = schema.validate(payload);

        if (error) {
            throw new Error(error.details[0].message);
        }

        this.name = value.name;
    }
}

module.exports = HelloWorldDTO;