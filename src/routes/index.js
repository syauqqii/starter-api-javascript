const express = require('express');
const router = express.Router();

const HealthRoute = require("./health.route");

router.use(HealthRoute);

module.exports = router;