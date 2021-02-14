require("./handler")

const Discord = require("discord.js");

const config = require("./src/config/json/config.json");

const client = new Discord.Client({
    prefix: config.prefix,
    token: config.token,
    shardCount: config.shards
});

require("./src/client/giveawayManager")(client)

client.login(client.options.token)

module.exports = {
    client
}