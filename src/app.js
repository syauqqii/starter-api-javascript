const express = require('express');
const { ResponseUtil } = require("./utils");

const routes = require("./routes");

class App {
    constructor() {
        this.app = express();

        this.SetupMiddleware();
        this.SetupRoutes();
        this.SetupNotFoundHandler();
        this.ConnectDatabase();
    }

    SetupMiddleware() {
        this.app.use(express.json());
    }

    SetupRoutes() {
        this.app.use(routes);
    }

    SetupNotFoundHandler() {
        this.app.use((req, res, next) => {
            res.send(ResponseUtil.NotFound());
        });
    }

    ConnectDatabase() {

    }

    GetServer() {
        return this.app;
    }
}

module.exports = App;