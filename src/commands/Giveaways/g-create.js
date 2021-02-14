const ms = require("ms")

const giveaway = {}

exports.run = async (client, message, args) => {

    step = 1;

    if(!message.member.hasPermission('MANAGE_GUILD') && !message.member.roles.cache.some((r) => r.name === "GiveawayMOD")){
        return message.channel.send(`:x: ${message.author} **|** You need to have the \`MANAGE_GUILD\` permissions to start giveaways.`);
    }

        const collector = message.channel.createMessageCollector(msg =>
        msg.member.id === message.member.id &&
        msg.channel.id === message.channel.id,
        { max: 1 }
        )

        message.quote(`⏰ ${message.author} **|** Enter the duration of the giveaway, example: \`10s, 10m, 10d, 10y ...\``)
        
        collector.on('collect', async (message) => {

            if(message.content.toLowerCase() === 'stop' || message.content.toLowerCase() === 'close' || message.content.toLowerCase() === 'cancel') return message.quote(`✅ ${message.author} **|** Successfully canceled`).then(m => {
                collector.stop()
            })

            if(step == 1) {

            message.react("✅").then(m => {
                step = eval(1 + 1);

                message.quote(`⏰ ${message.author} **|** Give the id or mention the channel where the Giveaway will take place`)

                const collector2 = message.channel.createMessageCollector(msg =>
                    msg.member.id === message.member.id &&
                    msg.channel.id === message.channel.id,
                    { max: 1 }
                )

                collector2.on("collect", (message) => {
                let cnh = message.mentions.channels.first() || message.guild.channels.cache.get(message.content) || message.guild.channels.cache.find(c => c.id === args[0]);
                
                let argumento = message.content.replace(/`/g, '')

                if(!cnh) return message.quote(`:x: ${message.author} **|** I didn't find any channel related to: \`${argumento}\``).then(m => {
                    collector2.stop()
                })

                giveaway.canal = cnh
                
                message.react("✅").then(m3 => {

                    const collector3 = message.channel.createMessageCollector(msg =>
                        msg.member.id === message.member.id &&
                        msg.channel.id === message.channel.id,
                        { max: 1 }
                    )
                    
                    message.quote(`⏰ ${message.author} **|** Enter the number of winners`)

                    collector3.on("collect", (message) => {

                        giveaway.winners = message.content

                        message.react("✅").then(m4 => {

                            const collector4 = message.channel.createMessageCollector(msg =>
                                msg.member.id === message.member.id &&
                                msg.channel.id === message.channel.id,
                                { max: 1 }
                            )
                            
                            collector4.on("collect", (message) => {
                                
                            })

                        })

                    })

                })

                })
            })
            
            giveaway.tempo = ms(message.content)

            }

        })

        /*
        client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(' '),
            winnerCount: parseInt(args[1])
        })
        */
};
exports.help = {
  name: 'g-create',
  aliases: ['giveaway-create', 'g-c', 'giveaway-c', 'giveaway-start', 'g-start', 'g-setup', 'giveaway-setup', 'g-s'],
  description: 'Create a Giveaway',
  category: "giveaways",
  usage: '+g-create',
  cat: 'give'
}