const axios = require('axios');

// '/auth/login'
async function login(req, res) {
  const redirectUri = encodeURIComponent(`${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env.PORT}/auth/login-callback`);
  const url = `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&scope=identify`;

  res.redirect(url);
}

// '/auth/login-callback'
async function loginCallback(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('No authorization code');
  }

  try {
    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000/auth/login-callback'
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const response = await axios.post('https://discord.com/api/oauth2/token', params, { headers });

    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`
      }
    });

    const user = userResponse.data;

    res.json({ user });

  } catch (error) {
    console.error('Error during Discord authentication:', error);
    res.status(500).send('Error during Discord authentication');
  }
}

module.exports = { login, loginCallback };