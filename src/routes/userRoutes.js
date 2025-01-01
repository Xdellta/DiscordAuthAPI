const express = require('express');
const userController = require('../controlers/userController');

const router = express.Router();

router.get('/getUser', userController.getUserByToken);
router.get('/getUserRoles', userController.getUserRolesByToken);

module.exports = router;