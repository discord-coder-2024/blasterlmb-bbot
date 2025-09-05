require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  
  // Self-ping every 30 seconds
  setInterval(() => {
    console.log('Self-ping sent');
  }, 30000);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const content = message.content.trim();

  // !ping command
  if (content.toLowerCase() === '!ping') {
    const latency = Date.now() - message.createdTimestamp;
    message.channel.send(`🏓 Pong! Latency is ${latency}ms.`);
    return;
  }

  // !say command
  if (content.toLowerCase().startsWith('!say ')) {
    const text = content.slice(5).trim();
    if (!text) {
      message.channel.send('❌ You must provide a message to say.');
      return;
    }
    message.channel.send(text);
    return;
  }

  // !dm command
  if (content.toLowerCase().startsWith('!dm ')) {
    const args = content.slice(4).trim().split(/ +/);
    const userId = args.shift();
    const dmMessage = args.join(' ');

    if (!userId || !dmMessage) {
      message.channel.send('❌ Usage: !dm <userID> <message>');
      return;
    }

    try {
      const user = await client.users.fetch(userId);
      await user.send(dmMessage);
      message.channel.send(`✅ DM sent to **${user.username}**.`);
    } catch (error) {
      console.error(error);
      message.channel.send('❌ Could not send DM. Make sure the ID is correct and the user can receive DMs.');
    }
    return;
  }
});

client.login(process.env.TOKEN);
