const express = require('express');
const router = express.Router();

const { logController } = require('../controllers');

// Users Controller
router.post('/submit', logController.submit);

module.exports = router;
