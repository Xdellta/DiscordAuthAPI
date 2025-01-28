const express = require('express');
const { getMe, getMeRoles } = require('../controlers/usersController');
const { isLogged, refreshToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', isLogged, refreshToken, getMe);
router.get('/meRoles', isLogged, refreshToken, getMeRoles);

module.exports = router;