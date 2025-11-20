const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { ResponseUtil } = require("./utils");

const database = require("../database");
const routes = require("./routes");

// Import models to initialize associations
require("./models");

class App {
    constructor() {
        this.app = express();

        this.SetupMiddleware();
        this.SetupRoutes();
        this.SetupNotFoundHandler();
        this.ConnectDatabase();
    }

    SetupMiddleware() {
        // Security middleware
        this.app.use(helmet());

        // CORS configuration
        const corsOptions = {
            origin: process.env.CORS_ALLOWED_ORIGINS
                ? process.env.CORS_ALLOWED_ORIGINS.split(',')
                : '*',
            methods: process.env.CORS_ALLOWED_METHODS
                ? process.env.CORS_ALLOWED_METHODS.split(',')
                : ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: process.env.CORS_ALLOWED_HEADERS
                ? process.env.CORS_ALLOWED_HEADERS.split(',')
                : ['Content-Type', 'Authorization'],
            credentials: true
        };
        this.app.use(cors(corsOptions));

        // Rate limiting
        const limiter = rateLimit({
            windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
            max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
            message: ResponseUtil.TooManyRequests('Too many requests, please try again later')
        });
        this.app.use(limiter);

        // Body parsing
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