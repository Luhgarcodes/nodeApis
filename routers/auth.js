const express = require('express');
const router = express.Router();
const registerController = require('../controllers/authController');

router.post('/', registerController.handleLogin);

module.exports = router