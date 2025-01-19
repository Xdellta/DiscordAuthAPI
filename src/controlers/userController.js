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

    const { success, data: user } = await fetchUserByToken(accessToken);

    return res.status(200).json({
      success,
      user,
    });

  } catch (error) {
    next(error);
  }
}


// '/api/user/getUserRoles'
async function getUserRolesByToken(req, res, next) {
  try {
    const accessToken = req.accessToken;

    if (!accessToken) {
      throw createHttpError('Access token is missing', 400);
    }
    
    const userResponse = await fetchUserByToken(accessToken);

    const userId = userResponse.id

    if (!userId) {
      throw createHttpError('User ID not found', 404);
    }

    const rolesResponse = await fetchRolesByUserId(userId);

    return res.status(200).json({
      success: true,
      roles: rolesResponse
    });

  } catch (error) {
    next(error);
  }
}

module.exports = { getUserByToken, getUserRolesByToken };
