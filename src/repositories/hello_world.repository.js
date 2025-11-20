const HelloWorldModel = require("../models/hello_world.model");

class HelloWorldRepository {
    static getHello(name = "World") {
        return new HelloWorldModel(name);
    }
}

module.exports = HelloWorldRepository;