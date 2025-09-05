require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const SELF_PING_URL = 'https://your-render-url.onrender.com/'; // Replace with your Render service URL

// Ping command
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === '!ping') {
        const sent = await message.channel.send('Pinging...');
        const latency = sent.createdTimestamp - message.createdTimestamp;
        sent.edit(`🏓 Pong! Latency: ${latency}ms`);
    }
});

// Log in
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Self-ping every 30 seconds
    setInterval(async () => {
        try {
            await fetch(SELF_PING_URL);
            console.log('Self-ping sent');
        } catch (err) {
            console.error('Failed to self-ping:', err);
        }
    }, 30 * 1000); // 30 seconds
});

client.login(process.env.token);
