const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const userRoute = require('./usersRoute');

const authMiddleware = require('../middleware/authMiddleware');

router.use('/auth', authRoute);
router.use('/users', authMiddleware.isLogged, userRoute);

module.exports = router;