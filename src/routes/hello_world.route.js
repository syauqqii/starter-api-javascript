const express = require('express');
const router = express.Router();

const { HelloWorldController } = require('../controllers');

router.get('/set-name', HelloWorldController.SetName);
router.get('/hello', HelloWorldController.GetHello);

module.exports = router;