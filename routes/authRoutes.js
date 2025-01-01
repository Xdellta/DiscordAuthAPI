const express = require('express');
const discordController = require('../controlers/discordController');

const router = express.Router();

router.get('/login', discordController.login);
router.get('/login-callback', discordController.loginCallback);

module.exports = router;