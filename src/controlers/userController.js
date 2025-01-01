const axios = require('axios');

// '/user/getUser'
async function getUserByToken(req, res, next) {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    throw { status: 400, message: 'Access token missing' };
  }

  try {
    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.data) {
      throw { status: 404, message: 'User not found' };
    }

    return res.status(200).json({
      success: true,
      user: userResponse.data,
    });

  } catch (error) {
    next(error);
  }
}


// '/user/getUserRoles'
async function getUserRolesByToken(req, res, next) {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    throw { status: 400, message: 'Access token is missing' };
  }

  const guildId = process.env.DISCORD_GUILD_ID;

  if (!guildId) {
    throw { status: 400, message: 'Guild ID is missing' };
  }

  try {
    const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userId = userResponse.data.id;

    if (!userId) {
      throw { status: 404, message: 'User not found' };
    }

    const discordToken = process.env.DISCORD_TOKEN;

    if (!discordToken) {
      throw { status: 400, message: 'Discord Token is missing' };
    }

    const rolesResponse = await axios.get(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
      headers: {
        Authorization: `Bot ${discordToken}`,
      },
    });

    if (!rolesResponse.data.roles) {
      throw { status: 500, message: 'Failed to fetch user roles' };
    }

    const roles = rolesResponse.data.roles;
    
    return res.status(200).json({
      success: true,
      roles: roles
    });

  } catch (error) {
    next(error);
  }
}

module.exports = { getUserByToken, getUserRolesByToken };
