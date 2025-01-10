const axios = require('axios');

async function isLogged(req, res, next) {
  try {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
      throw { status: 401, message: 'Unauthorized: Access token is missing.' };
    }

    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.data) {
      throw { status: 401, message: 'Unauthorized: Invalid access token.' };
    }

    req.user = userResponse.data;
    req.accessToken = accessToken;

    next();

  } catch(error) {
    next(error);
  }
}

module.exports = { isLogged };