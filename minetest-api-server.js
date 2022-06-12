const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const { minetestApiPort } = require('./config');
const bot = require('./bot');

server.use(bodyParser.json());

server.post('', async (req, res) => {
    if (req.body.type === 'DISCORD-RELAY-MESSAGE') {
        console.log(req.body.type);
        await bot.channel.send(req.body.content);
        return res.json({ ok: true });
    }

    else if (req.body.type === 'DISCORD-REQUEST-DATA') {
        return res.json(bot.fetchMessages());
    }

    res.json({ errorMessage: 'invalid type' });
})

function runMinetestApiServer() {
    server.listen(minetestApiPort, () => {
        console.log('minetest api server is running.');
    })
}

module.exports = runMinetestApiServer;