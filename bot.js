const { Client, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID; // Add your client ID here
const GUILD_ID = process.env.GUILD_ID; // Optional: Add your guild ID for testing

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Define the slash command
const commands = [
    {
        name: 'status',
        description: 'Replies with the bot status!',
    },
];

// Register the slash command
const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), // Use Routes.applicationCommands(CLIENT_ID) for global commands
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'status') {
        await interaction.reply('Bot is up and running!');
    }
});

client.login(TOKEN);
