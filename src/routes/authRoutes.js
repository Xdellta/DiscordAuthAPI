const express = require('express');
const authController = require('../controlers/authController');

const router = express.Router();

router.get('/login', authController.login);
router.get('/login-callback', authController.loginCallback);

module.exports = router;