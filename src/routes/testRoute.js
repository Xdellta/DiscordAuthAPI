const express = require('express');
const { helloAdmin } = require('../controlers/testController');
const { isLogged, requireRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/helloAdmin', isLogged, requireRoles([process.env.DISCORD_ROLE_ID_ADMIN]), helloAdmin);

module.exports = router;