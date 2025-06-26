const express = require('express');
const { ResponseUtil } = require("./utils");

const database = require("../database");
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
        this.app.use(express.urlencoded({ extended: true }));
    }

    SetupRoutes() {
        this.app.use(routes);
    }

    SetupNotFoundHandler() {
        this.app.use((req, res, next) => {
            res.send(ResponseUtil.NotFound());
        });
    }

    async ConnectDatabase() {
        try {
            await database.sync();
        } catch(error) {
            console.error(`\n  [ERROR] Connecting to the database: ${error.message}`);
        }
    }

    GetServer() {
        return this.app;
    }
}

module.exports = App;