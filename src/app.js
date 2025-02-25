const express = require('express');

class App {
    constructor() {
        this.app = express();
        this.SetupRoutes();
    }

    SetupRoutes() {
        this.app.get('/', (req, res) => {
            res.send('Hello, World!');
        });
    }

    GetServer() {
        return this.app;
    }
}

module.exports = App;