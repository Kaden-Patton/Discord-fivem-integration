const Discord = require("discord.js");
const client = new Discord.Client({ intents: Object.keys(Discord.Intents.FLAGS) });
const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi(config.ip);
const config = require("./config.json");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

});

client.on('messageCreate', async (message) => {
    if (!message.guild || message.author.bot) return;
    if (message.content === '!stats') {
        server.getPlayers().then(async (data) => {
            let result = [];
            let index = 1;

            for (let player of data) {
                result.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping\n`);
            }

            const embed = new Discord.MessageEmbed()
                .setColor("LIGHT_GREY")
                .setAuthor("Server is online")
                .setTitle(`Players (${data.length}/${(await server.getMaxPlayers())})`)
                .setDescription(result.length > 0 ? result.join(" ") : 'No players online')
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        }).catch((err) => {
            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor("Server is offline")
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
            console.log(err);
        });
    }
});


client.on('messageCreate', async(message) => {
    if (!message.guild || message.author.bot) return;
    if (message.content === '!gangs') {
     
        
        let gdObj = [
            {
                "name": "David",
                "id": "247597119379210241"
            },
            {
                "name": "Derick",
                "id": "176858463668928521"
            },
            {
                "name": "Carter",
                "id": "643927675018149888"
            },
            {
                "name": "Bunnie",
                "id": "650174833237295124"
            },

            {
                "name": "Bubba",
                "id": "708582497771847700"
            },
        ];

        let ggObj = [];

        let mercObj = [
            {
            "name": "Bobby",
            "id": "130843760790732801"
            },

            {
                "name": "Ten Bob",
                "id": "908519227818917898"
            },
            {
                "name": "Ty",
                "id": "908076229255659570"
            }

    ];


        server.getPlayers().then(async data => {
            let players = [];
            let identifiers = [];
            let index = 1;
            for(let player of data)
            {
                players.push(`${index++}. ${player.name} | ${player.id} ID | ${player.ping} ping\n`);
                identifiers.push(`ID: ${player.id} | ${player.identifiers}\n`)
            }

            
            let gdResult = [];
            let mercResult = [];
            let k = 0;
            for(let x of identifiers) {
                let re = /(discord:[0-9])\w+/;
                let myArray = re.exec(x);
                //console.log(myArray[0].split(":")[1]);
                let discordID = myArray[0].split(":")[1];
               
                for(let id of gdObj)
                {
                    if(discordID === id.id)
                    {
                        
                        gdResult.push(`${id.name}\n`);
                        console.log(gdResult);
                    }
                }

                for(let id of mercObj)
                {
                    if(discordID === id.id)
                    {
                        mercResult.push(`${id.name}\n`);
                        console.log(mercResult);
                    }
                }

                k++
            }

            const embed = new Discord.MessageEmbed()
                .setColor("LIGHT_GREY")
                .setAuthor("Gangster disciples")
                .setTitle(`Players (${gdResult.length}/ ${gdObj.length})`)
                .setDescription(gdResult.length > 0 ? gdResult.join(" ") : 'No players online')
                .setTimestamp();

            const embed2 = new Discord.MessageEmbed()
                .setColor("DARK_GREEN")
                .setAuthor("Mercenaries")
                .setTitle(`Players (${mercResult.length}/ ${mercObj.length})`)
                .setDescription( mercResult.length > 0 ? mercResult.join(" ") : 'No opps online')
                .setTimestamp();
            
                message.channel.send({ embeds: [embed, embed2] });
            


        }).catch((err) => {
            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor("Something fucked up")
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
            console.log(err);

        })
       


    }
});


client.on('messageCreate', async(message) => {
    if(!message.guild || message.author.bot) return;

    if(message.content === '!identity')
    {

        server.getPlayers().then(async (data) => {
            let result = [];

            for(let player of data)
            {
                let re = /(discord:[0-9])\w+/
                let myArray = re.exec(player.identifiers);
                let discordID = myArray[0].split(":")[1];
                result.push(`Name: ${player.name} | ID: ${player.id} | Discord ID: ${discordID}`);
            }
        
            for(let toPrint of result)
            {
                console.log(toPrint);
            }

        });
          /*
            
            const embed = new Discord.MessageEmbed()
                .setColor("LIGHT_GREY")
                .setAuthor("Server is online")
                .setTitle(`Players (${data.length}/${(await server.getMaxPlayers())})`)
                .setDescription(result.length > 0 ? result.join(" ") : 'No players online')
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        }).catch((err) => {
            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor("Server is offline")
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
            console.log(err);
        });
*/
    }


});






client.login(config.token);