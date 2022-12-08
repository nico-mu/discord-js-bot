import {Client, IntentsBitField, ChannelType, Events} from "discord.js";
import {poke} from "./commands/poke";
import {commands} from "./commands/commands";
import {SlashCommand} from "./type/slash-command";
import {executeCommand} from "./utils/command-execute-utils";
import {logger} from "./utils/logger-utils";

export const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildVoiceStates]
});

const messageIntervals = new Map<string, {timeout: NodeJS.Timeout, cycles: number}>();

client.on("ready", () => {
    logger.info("Client is ready!");
});

client.on('voiceStateUpdate', (oldState, newState) => {
    // Check if the user has deafened themselves
    if (!oldState.selfDeaf && newState.selfDeaf) {
        // Start sending messages every 1 minute
        const interval = 60 * 1000; // 1 minute in milliseconds
        const timeout = setInterval(() => {
            const cycles = messageIntervals.get(newState.id)?.cycles ?? 0;
            poke(newState.member?.user!, `You have been deafened for ${cycles} Minutes`, "Wake up!");
            messageIntervals.set(newState.id, {timeout, cycles: cycles + 1});
        }, interval);
        messageIntervals.set(newState.id, {timeout, cycles: 1});
    } else if (oldState.selfDeaf && !newState.selfDeaf) {
        // Stop sending messages if the user undeafens themselves
        const noti = messageIntervals.get(newState.id);
        if (noti) {
            clearInterval(noti.timeout);
            // Remove the interval for this user
            messageIntervals.delete(newState.id);
        }
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isCommand()) {
        executeCommand(commands.get(interaction.commandName) as SlashCommand, interaction);
    }
});
