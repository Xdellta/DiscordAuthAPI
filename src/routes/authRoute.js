const express = require('express');
const router = express.Router();
const authController = require('../controlers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/login', authController.login);
router.get('/login-callback', authController.loginCallback);
router.get('/logout', authMiddleware.isLogged, authController.logout);

module.exports = router;