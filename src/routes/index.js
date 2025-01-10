const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');

const authMiddleware = require('../middleware/authMiddleware');

router.use('/auth', authRoute);
router.use('/user', authMiddleware.isLogged, userRoute);

module.exports = router;