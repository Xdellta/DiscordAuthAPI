const { fetchUserByToken, fetchRolesByUserId } = require('../services/usersServices');
const { createHttpError } = require('../utils/createHttpError');
const axios = require('axios');


// Verification if the user is logged in
async function isLogged(req, res, next) {
  try {
    const accessToken = req.cookies?.access_token;
    const refreshToken = req.cookies?.refresh_token;

    if (!accessToken) {
      if (refreshToken) {
        req.isLogged = false;
        return next();
      }

      throw createHttpError('Access token is missing', 401);
    }

    const { success: userSuccess, data: user } = await fetchUserByToken(accessToken);
    if (!userSuccess == true || !user) {
      if (refreshToken) {
        req.isLogged = false;
        return next();
      }

      throw createHttpError('User not found or invalid token', 404);
    }

    req.user = user;
    req.accessToken = accessToken;
    req.isLogged = true;

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


async function refreshToken(req, res, next) {
  try {
    const isLogged = req.isLogged;

    if (isLogged == true) {
      return next();
    }

    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      throw createHttpError('User not found or invalid token', 404);
    }

    const params = new URLSearchParams({
      client_id: process.env.DISCORD_BOT_CLIENT_ID,
      client_secret: process.env.DISCORD_BOT_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', params, { headers });

    if (!tokenResponse.data.access_token || !tokenResponse.data.refresh_token) {
      if (isLogged == false) {
        throw createHttpError('User not found or invalid token', 404);
      }

      return next();
    }

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: expires_in * 1000,
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
    });

    const { success: userSuccess, data: user } = await fetchUserByToken(accessToken);
    if (!userSuccess == true || !user) {
      if (refreshToken) {
        req.isLogged = false;
        return next();
      }

      throw createHttpError('User not found or invalid token', 404);
    }

    req.user = user;
    req.accessToken = access_token;
    req.isLogged = true;
    next();

  } catch(error) {
    next(error);
  }
}

module.exports = { isLogged, requireRoles, refreshToken };