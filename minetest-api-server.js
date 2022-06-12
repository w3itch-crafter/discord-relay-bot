const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const { minetestApiPort } = require('./config');
const bot = require('./bot');

server.use(bodyParser.urlencoded({ extended: true }));


server.post('/', async (req, res) => {
    req.body = JSON.parse(Object.keys(req.body)[0]);
    console.log(req.body);
    if (req.body.type === 'DISCORD-RELAY-MESSAGE') {
        await bot.channel.send(req.body.content);
        return res.json({ ok: true });
    }

    else if (req.body.type === 'DISCORD-REQUEST-DATA') {
        const messages = bot.fetchMessages();
        res.json({messages});
        return;
    }

    res.json({ errorMessage: 'invalid type' });
});

function runMinetestApiServer() {
    server.listen(minetestApiPort, () => {
        console.log('minetest api server is running.');
    })
}

module.exports = runMinetestApiServer;