const express = require('express');
const router = express.Router();

const HelloWorld = require("./hello_world_route.js");

router.use(HelloWorld);

module.exports = router;