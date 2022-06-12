const config = require('./config.js');
const { Client, Intents, MessageSelectMenu } = require('discord.js');
const { exit } = require('process');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let bot = {
    client,
    messages: [],
    channel: null
}
client.once('ready', async () => {
    bot.channel = await client.channels.fetch(config.channelId, { allowUnknownGuild: true });
    if (!bot.channel) {
        console.error('cannot get channel');
        exit();
    }
    console.log('Discord bot is running.');
});

client.on('messageCreate', (message) => {
    if (message.author.bot || message.channelId != config.channelId) {
        return;
    }
    bot.messages.push({ author: message.author.username, content: message.content });
});

bot.run = () => {
    client.login(config.token);
}

bot.fetchMessages= () =>{
    const msgs = bot.messages;
    bot.messages = [];
    return msgs;
}

module.exports = bot;