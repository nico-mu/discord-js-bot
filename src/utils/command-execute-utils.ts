import {SlashCommand} from "../type/slash-command";
import {CommandInteraction, REST, Routes} from "discord.js";
import {formattedCommands} from "../commands/commands";

export async function executeCommand(command: SlashCommand, interaction: CommandInteraction) {
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
}

export async function registerCommands(clientId: string, guildId: string, token: string) {
    const rest = new REST({ version: '10' }).setToken(token);

    await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: formattedCommands },
    );
}