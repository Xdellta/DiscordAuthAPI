const axios = require('axios');

// '/auth/login'
async function login(req, res) {
  try {
    const redirectUri = encodeURIComponent(`${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}/auth/login-callback`);
    const url = `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=identify`;

    res.redirect(url);
  } catch (error) {
    console.error('Error constructing login URL:', error);
    res.status(500).send('Error initiating login process');
  }
}

// '/auth/login-callback'
async function loginCallback(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Missing authorization code');
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
      'Accept-Encoding': 'application/x-www-form-urlencoded'
    };

    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', params, { headers });

    if (!tokenResponse.data.access_token) {
      console.error('Invalid token response:', tokenResponse.data);
      return res.status(500).send('Failed to retrieve tokens');
    }

    const { access_token, refresh_token, expires_in, scope, token_type } = tokenResponse.data;

    res.status(200).json({
      access_token,
      refresh_token,
      expires_in,
      scope,
      token_type,
    });

  } catch (error) {
    console.error('Error during Discord authentication:', error?.response?.data || error.message);
    res.status(500).send('Error during Discord authentication');
  }
}

module.exports = { login, loginCallback };