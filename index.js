const Discord = require("discord.js");
const config = require("./config.json");
const commands = require('./all_commands.json')

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = "!";

client.on("messageCreate", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }
    
    else if (command === "sum") {
        if (args.length < 1) {
            message.reply("You must provide at least one number to sum.");
            return;
        }

        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);
        message.reply(`The sum of all the arguments you provided is ${sum}!`);
    }

    else if (command === "info") {
        message.reply(`I am the official bot of JacobHQ. Visit my site at https://jacob.omg.lol. I am hosted on a raspberry pi and I am running Node.js ${process.version}.`);
    }

    else if (command === "help") {
        let msg
        for (let i in commands) {
            msg.contact('`' + commands[i].id + '`' + ' - ' + commands[i].id)
        }
        message.reply(msg)
    }
});

client.login(config.BOT_TOKEN);