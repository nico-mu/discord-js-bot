import {Client, IntentsBitField, ChannelType, GuildBasedChannel} from "discord.js";
import {remind} from "./commands/remind";
import {checkIfStringStartsWith} from "./utils/string-utils";
import {commands} from "./commands/commands";

export const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]
});

let botCommandsChannel: GuildBasedChannel;

client.on("ready", () => {
    console.log("Ready!");
});

client.on('guildCreate', async (guild) => {
    let botCommandsCategory = guild.channels.cache.find(channel => channel.name === 'Bot Channels' && channel.type === ChannelType.GuildCategory);
    if (!botCommandsCategory) {
        botCommandsCategory = await guild.channels.create({
            name: 'Bot Channels',
            type: ChannelType.GuildCategory
        });
    }

    if (!botCommandsChannel) {
        botCommandsChannel = await guild.channels.create({
            name: 'bot-commands',
            type: ChannelType.GuildText,
            parent: botCommandsCategory?.id,
        });
    }
});

client.on("messageCreate", async (message) => {
    const guild = message.guild;
    if (!guild) {
        return;
    }
    let commandsChannel = guild.channels.cache.find(channel => channel.name === 'bot-commands' && channel.type === ChannelType.GuildText);
    if (!commandsChannel) {
        let botCommandsCategory = guild.channels.cache.find(channel => channel.name === 'Bot Channels' && channel.type === ChannelType.GuildCategory);
        if (!botCommandsCategory) {
            botCommandsCategory = await guild.channels.create({
                name: 'Bot Channels',
                type: ChannelType.GuildCategory
            });
        }
        commandsChannel = await guild.channels.create({
            name: 'bot-commands',
            type: ChannelType.GuildText,
            parent: botCommandsCategory?.id,
        });
    }
    if (message.content.startsWith("!remind")) {
        remind(message.author, message.content, commandsChannel);
    }
    if (message.channel.id === commandsChannel.id && !message.author.bot || checkIfStringStartsWith(message.content, commands)) {
        // Delete the message
        message.delete();
    }
});

