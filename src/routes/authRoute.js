const express = require('express');
const router = express.Router();
const { login, loginCallback, logout } = require('../controlers/authController');
const { isLogged } = require('../middleware/authMiddleware');

router.get('/login', login);
router.get('/login-callback', loginCallback);
router.get('/logout', isLogged, logout);

module.exports = router;