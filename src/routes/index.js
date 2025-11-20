const express = require('express');
const router = express.Router();

const HelloWorldRoute = require("./hello_world.route");

router.use(HelloWorldRoute);

module.exports = router;