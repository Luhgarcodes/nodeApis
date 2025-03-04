const express = require('express');
const router = express.Router();
const registerController = require('../controllers/refreshTokenController');

router.get('/', registerController.handleRefreshToken);

module.exports = router