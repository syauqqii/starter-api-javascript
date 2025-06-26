const { ResponseUtil } = require('../utils');
const HelloWorldDTO = require("../dtos/hello_world.dto");
const HelloWorldService = require("../services/hello_world.service");

class HelloWorldController {
    static async SetName(req, res) {
        try {
            const raw_data = new HelloWorldDTO(
                {
                    name: req.query.name || "World"
                }
            );

            const result = HelloWorldService.getMessage(raw_data);
            return res.send(ResponseUtil.SuccessResponse(result));
        } catch (err) {
            return res.status(400).json(ResponseUtil.BadRequest(err.message));
        }
    }

    static async GetHello(req, res) {
        try {
            const result = HelloWorldService.getHello();
            return res.send(ResponseUtil.SuccessResponse(result));
        } catch (err) {
            return res.status(400).json(ResponseUtil.BadRequest(err.message));
        }
    }
}

module.exports = HelloWorldController;