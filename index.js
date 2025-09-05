require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  // Self-ping every 30 seconds to keep alive
  setInterval(() => {
    console.log('Self-ping sent');
  }, 30000);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === '!ping') {
    const latency = Date.now() - message.createdTimestamp;
    message.channel.send(`🏓 Pong! Latency is ${latency}ms.`);
  }
});

client.login(process.env.TOKEN);
