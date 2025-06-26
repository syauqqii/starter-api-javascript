const HelloWorldRepository = require("../repositories/hello_world.repository");

class HelloWorldService {
    static getHello() {
        const data = HelloWorldRepository.getHello("World");

        return {
            text: `Hello ${data.name}!`
        }
    }

    static getMessage(data) {
        return {
            text: `Hello ${data.name}!`
        };
    }
}

module.exports = HelloWorldService;