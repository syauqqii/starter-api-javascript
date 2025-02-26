require('dotenv').config();
const { Sequelize } = require('sequelize');

const database = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: Number(process.env.DB_PORT),
    logging: process.env.DB_LOGGING.toLowerCase() === 'true' ? console.log : false,
    pool: {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: { connectTimeout: 30000 },
    retry: { max: 3 }
});

module.exports = database;