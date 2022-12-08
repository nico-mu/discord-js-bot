import {SlashCommand} from "../type/slash-command";
import {CommandInteraction, REST, Routes} from "discord.js";
import {formattedCommands} from "../commands/commands";
import {logger} from "./logger-utils";

export async function executeCommand(command: SlashCommand, interaction: CommandInteraction) {
    try {
        await command.execute(interaction);
    } catch (error) {
        logger.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
}

export async function registerCommands(applicationId: string, guildId: string, token: string) {
    const rest = new REST({ version: '10' }).setToken(token);

    // for guild-based commands
    await rest.put(Routes.applicationGuildCommands(applicationId, guildId), { body: [] })
        .then(() => logger.info('Successfully deleted all guild commands.'))
        .catch(logger.error);

    // for global commands
    await rest.put(Routes.applicationCommands(applicationId), { body: [] })
        .then(() => logger.info('Successfully deleted all application commands.'))
        .catch(logger.error);

    await rest.put(
        Routes.applicationGuildCommands(applicationId, guildId),
        { body: formattedCommands },
    ).then(() => logger.info("Successfully registered application commands.")).catch(logger.error);
}