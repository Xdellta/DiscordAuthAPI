const axios = require('axios');
const { fetchUserByToken, fetchRolesByUserId } = require('../services/userServices');

// '/api/user/getUser'
async function getUserByToken(req, res, next) {
  try {
    const accessToken = req.accessToken;

    if (!accessToken) {
      throw { status: 400, message: 'Access token is missing' };
    }

    const userResponse = await fetchUserByToken(accessToken);

    return res.status(200).json({
      success: true,
      user: userResponse
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
      throw { status: 400, message: 'Access token is missing' };
    }
    
    const userResponse = await fetchUserByToken(accessToken);

    const userId = userResponse.id

    if (!userId) {
      throw { status: 404, message: 'User ID not found' };
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
