const axios = require('axios');
const { createHttpError } = require('../utils/createHttpError');

// '/api/auth/login'
async function login(req, res, next) {
  try {
    const discordBotTokenId = process.env.DISCORD_BOT_CLIENT_ID;

    if (!discordBotTokenId) {
      throw createHttpError('Missing Discord Client ID', 400);
    }

    const redirectUri = `${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}/api/auth/login-callback`;
    const encodedRedirectUri = encodeURIComponent(redirectUri);
    const scope = 'identify+guilds+guilds.members.read';
    const url = `https://discord.com/oauth2/authorize?client_id=${discordBotTokenId}&response_type=code&redirect_uri=${encodedRedirectUri}&scope=${scope}`;

  
    return res.redirect(url);
  } catch (error) {
    next(error);
  }
}


// '/api/auth/login-callback'
async function loginCallback(req, res, next) {
  try {
    const code = req.query.code;

    if (!code) {
      throw createHttpError('Missing authorization code', 400);
    }

    const redirectUri = `${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}/api/auth/login-callback`;

    const params = new URLSearchParams({
      client_id: process.env.DISCORD_BOT_CLIENT_ID,
      client_secret: process.env.DISCORD_BOT_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/x-www-form-urlencoded',
    };

    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', params, { headers });

    if (!tokenResponse.data.access_token || !tokenResponse.data.refresh_token) {
      throw createHttpError('Failed to retrieve access or refresh tokens from Discord', 500);
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

    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
    });

  } catch (error) {
    next(error); 
  }
}


// '/api/auth/logout'
function logout(req, res, next) {
  try {
    const accessToken = req.accessToken;
    const refreshToken = req.cookies.refresh_token;

    if (!accessToken || !refreshToken) {
      throw createHttpError('Access token or refresh token missing', 400);
    }

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully logged out',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { login, loginCallback, logout };