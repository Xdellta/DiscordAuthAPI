const axios = require('axios');

// Fetch user by token
async function fetchUserByToken(accessToken) {
  if (!accessToken) {
    return { status: 400, message: 'Access token is missing' };
  }

  const userResponse = await axios.get(`https://discord.com/api/v10/users/@me`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });

  const user = userResponse.data

  if (!user) {
    return { status: 500, message: 'Invalid user data received' };
  }

  return user;
}


// Fetch roles by user id
async function fetchRolesByUserId(userId) {
  const discordBotToken = process.env.DISCORD_BOT_TOKEN
  const guildId = process.env.DISCORD_GUILD_ID

  if (!userId) {
    return { status: 400, message: 'User ID is missing' };
  }

  if (!discordBotToken) {
    return { status: 400, message: 'Bot token is missing' };
  }

  if (!guildId) {
    return { status: 400, message: 'Guild ID is missing' };
  }

  const rolesResponse = await axios.get(`https://discord.com/api/v10/guilds/${guildId}/members/${userId}`, {
    headers: {
      Authorization: `Bot ${discordBotToken}`
    },
  });

  return rolesResponse.data.roles;
}

module.exports = { fetchUserByToken, fetchRolesByUserId };