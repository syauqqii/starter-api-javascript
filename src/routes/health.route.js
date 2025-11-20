const express = require('express');
const router = express.Router();
const { ResponseUtil } = require("../utils");

router.get('/health', (req, res) => {
    const healthData = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: {
            used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
            total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
        },
    };

    res.send(ResponseUtil.Success(healthData, 'Service is healthy'));
});

module.exports = router;
