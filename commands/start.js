const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Starts the minecraft server'),
  async execute(interaction) {
    await interaction.deferReply(); // Defer the reply to avoid immediate acknowledgment

    const channelId = interaction.channelId;
    const guildId = interaction.guildId;

    try {
      const response = await axios.post('https://n8n-production-f121.up.railway.app/webhook/1468d11d-7913-42d4-a3cd-012f9d7d99d1', {
        status: 'Starting server',
        server_start: 1,
        channelId: channelId,
        guildId: guildId
      });

      if (response.status === 200) {
        await interaction.editReply('Server start request sent successfully.');
      } else {
        await interaction.editReply('Server start request sent, but there was an issue.');
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
      const errorMessage = error.response ? 
          `Status: ${error.response.status}, Data: ${error.response.data}` : 
          'Unknown error occurred';
      await interaction.editReply(`Server start request failed. ${errorMessage}`);
    }
  },
};
