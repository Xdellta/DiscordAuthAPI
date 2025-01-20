const axios = require('axios');
const { fetchUserByToken, fetchRolesByUserId } = require('../services/userServices');
const { createHttpError } = require('../utils/createHttpError');

// '/api/user/getUser'
async function getUserByToken(req, res, next) {
  try {
    const accessToken = req.accessToken;
    if (!accessToken) {
      throw createHttpError('Access token is missing', 400);
    }

    const { success: userSuccess, data: user } = await fetchUserByToken(accessToken);
    if (!userSuccess == true || !user) {
      throw createHttpError('User not found or invalid token', 404);
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    next(error);
  }
}


// '/api/user/getUserRoles'
async function getUserRolesByToken(req, res, next) {
  try {
    const { accessToken } = req;

    if (!accessToken) {
      throw createHttpError('Access token is missing', 400);
    }

    const { success: userSuccess, data: user } = await fetchUserByToken(accessToken);
    if (!userSuccess == true || !user?.id) {
      throw createHttpError('User not found or invalid token', 404);
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


module.exports = { getUserByToken, getUserRolesByToken };