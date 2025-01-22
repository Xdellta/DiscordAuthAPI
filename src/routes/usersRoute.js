const express = require('express');
const { getMe, getMeRoles } = require('../controlers/usersController');
const { isLogged, requireRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', isLogged, getMe);
router.get('/meRoles', isLogged, getMeRoles);

module.exports = router;