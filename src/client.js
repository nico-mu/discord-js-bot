// First, we need to require the discord.js and moment.js libraries
import {remind} from "./commands/remind";

const { Client, Events, GatewayIntentBits } = require('discord.js');

// Next, we need to create a new Discord client
export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Then, we can create an event listener that will run whenever the bot receives a message
client.on('message', message => {
    // We want to check if the message starts with the "/remind" command
    if (message.content.startsWith('/remind')) {
        // If it does, we want to run the "remind" command
        remind(message);
    }
});

client.on(Events.READY, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});
