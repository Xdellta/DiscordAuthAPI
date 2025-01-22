const { fetchUserByToken, fetchRolesByUserId } = require('../services/usersServices');
const { createHttpError } = require('../utils/createHttpError');

// Verification if the user is logged in
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


// Verification if the user has all required roles
function requireRoles(requiredRoles = []) {
  return async function (req, res, next) {
    try {
      const user = req.user;

      if (!user || !user.id) {
        throw createHttpError('Unauthorized: User is not logged in', 401);
      }

      const { success: rolesSuccess, data: userRoles } = await fetchRolesByUserId(user.id);

      if (!rolesSuccess || !Array.isArray(userRoles)) {
        throw createHttpError('Unable to fetch user roles', 500);
      }

      const hasAllRoles = requiredRoles.every(role => userRoles.includes(role));

      if (!hasAllRoles) {
        throw createHttpError('Forbidden: Insufficient permissions', 403);
      }

      next();

    } catch (error) {
      next(error);
    }
  };
}

module.exports = { isLogged, requireRoles };