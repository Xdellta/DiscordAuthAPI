const { fetchUserByToken } = require('../services/userServices');
const { createHttpError } = require('../utils/createHttpError');

async function isLogged(req, res, next) {
  try {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      throw createHttpError('Unauthorized: Access token is missing', 401);
    }

    const { success: userSuccess, data: user } = await fetchUserByToken(accessToken);
    if (!userSuccess == true || !user) {
      throw createHttpError('User not found or invalid token', 404);
    }

    req.user = user;
    req.accessToken = accessToken;

    next();

  } catch(error) {
    next(error);
  }
}

module.exports = { isLogged };