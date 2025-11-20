const express = require('express');
const router = express.Router();

const AuthRoute = require("./auth.route");
const HelloWorldRoute = require("./hello_world.route");
const PermissionRoute = require("./permission.route");
const RoleRoute = require("./role.route");

router.use(AuthRoute);
router.use(HelloWorldRoute);
router.use(PermissionRoute);
router.use(RoleRoute);

module.exports = router;