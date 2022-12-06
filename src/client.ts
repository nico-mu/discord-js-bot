import {Client, IntentsBitField} from "discord.js";
import {remind} from "./commands/remind";

export const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages]
})

client.on("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", (message) => {
    if (message.content.startsWith("/remind")) {
        remind(message);
    }
})