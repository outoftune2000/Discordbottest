const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Replies with the bot status!'),
  async execute(interaction) {
    await interaction.reply('Bot is up and running!');
  },
};
