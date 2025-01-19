const axios = require('axios');

// Fetch user by token
async function fetchUserByToken(accessToken) {
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  try {
    const userResponse = await axios.get(`https://discord.com/api/v10/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = userResponse.data;

    if (!user) {
      throw new Error('Invalid user data received');
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

// Fetch roles by user id
async function fetchRolesByUserId(userId) {
  const discordBotToken = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!userId) {
    throw new Error('User ID is missing');
  }

  if (!discordBotToken) {
    throw new Error('Bot token is missing');
  }

  if (!guildId) {
    throw new Error('Guild ID is missing');
  }

  try {
    const rolesResponse = await axios.get(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
      headers: {
        Authorization: `Bot ${discordBotToken}`,
      },
    });

    if (!rolesResponse.data || !rolesResponse.data.roles) {
      throw new Error('Invalid roles data received');
    }

    return {
      success: true,
      data: rolesResponse.data.roles,
    };
  } catch (error) {
    throw new Error(`Failed to fetch roles: ${error.message}`);
  }
}

module.exports = { fetchUserByToken, fetchRolesByUserId };