const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Replies with the bot status and sends a POST request.'),
  async execute(interaction) {
    await interaction.deferReply(); // Defer the reply to avoid immediate acknowledgment

    try {
      const response = await axios.post('https://n8n-production-f121.up.railway.app/webhook/1468d11d-7913-42d4-a3cd-012f9d7d99d1', {
        status: 'Bot is up and running!'
      });

      if (response.status === 200) {
        await interaction.editReply('Bot is up and running! POST request sent successfully.');
      } else {
        await interaction.editReply('Bot is up and running! But there was an issue sending the POST request.');
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
      await interaction.editReply('Bot is up and running! But there was an error sending the POST request.');
    }
  },
};
