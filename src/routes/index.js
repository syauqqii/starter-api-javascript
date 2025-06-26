const express = require('express');
const router = express.Router();

const HelloWorld = require("./hello_world.route");

router.use(HelloWorld);

module.exports = router;