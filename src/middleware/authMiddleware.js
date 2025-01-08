async function isAuthentication(req, res, next) {
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

    next(userResponse.data);

  } catch(error) {
    next(error);
  }
}

module.exports = {isAuthentication};