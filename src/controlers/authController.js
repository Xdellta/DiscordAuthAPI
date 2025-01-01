const axios = require('axios');

// '/auth/login'
async function login(req, res, next) {
  try {
    if (!process.env.DISCORD_CLIENT_ID) {
      throw { status: 400, message: 'Missing Discord Client ID.' };
    }

    const redirectUri = encodeURIComponent(`${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}/auth/login-callback`);
    const scope = 'identify+guilds+guilds.members.read';
    const url = `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
  
    return res.redirect(url);
  } catch (error) {
    next(error);
  }
}


// '/auth/login-callback'
async function loginCallback(req, res, next) {
  const code = req.query.code;

  if (!code) {
    throw { status: 400, message: 'Missing authorization code' };
  }

  try {
    const redirectUri = `${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}/auth/login-callback`;

    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
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
      throw { status: 500, message: 'Failed to retrieve access or refresh tokens from Discord' };
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

module.exports = { login, loginCallback };