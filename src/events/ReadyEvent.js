const {client} = require("../../bot")
const cor = require("colors")

client.on("ready", () => {
    console.log(cor.green(`[BOT] | ${client.user.tag} Ready`));
    
    setInterval( () =>
        client.user.setActivity(`${client.user.username} | ${client.options.prefix}help [${client.ws.ping}ms]`),
    30000)

});