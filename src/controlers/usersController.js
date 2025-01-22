const axios = require('axios');
const { fetchUserByToken, fetchRolesByUserId } = require('../services/usersServices');
const { createHttpError } = require('../utils/createHttpError');

// '/api/user/getMe'
async function getMe(req, res, next) {
  try {
    const user = req.user;

    if (!user) {
      throw createHttpError('User not found', 404);
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    next(error);
  }
}


// '/api/user/getMeRoles'
async function getMeRoles(req, res, next) {
  try {
    const user = req.user;

    if (!user || !user.id) {
      throw createHttpError('User not found', 404);
    }

    const { success: rolesSuccess, data: roles } = await fetchRolesByUserId(user.id);
    if (!rolesSuccess == true || !roles) {
      throw createHttpError('Roles not found', 404);
    }

    return res.status(200).json({
      success: true,
      roles
    });

  } catch (error) {
    next(error);
  }
}


module.exports = { getMe, getMeRoles };