import {CommandInteraction, EmbedBuilder, SlashCommandBuilder, User} from "discord.js";

const pokeCommand = async (interaction: CommandInteraction) => {
    if (interaction && interaction.isCommand() && interaction.commandName === "poke") {
        const message = interaction.options.get("message");
        const title = interaction.options.get("title");
        const user = interaction.options.getUser("user");

        if (!message || !title || !user) {
            await interaction.reply("Please provide a message, title, and user!");
            return;
        }

        await poke(user, message.value as string, title.value as string);
        await interaction.reply("Poked!");
    }
}

export async function poke(user: User, message: string, title: string) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        .setColor('#ff0000')
        .setThumbnail(user.displayAvatarURL());
    await user.send({embeds: [embed]});
}

export const pokeSlashCommand = {data: new SlashCommandBuilder().setName("poke").setDescription("Poke a user")
        .addStringOption(option => option.setName("message").setDescription("The embed content").setRequired(true))
        .addStringOption(option => option.setName("title").setDescription("The embed title").setRequired(true))
        .addUserOption(option => option.setName("user").setDescription("The user to send the embed to").setRequired(true)), execute: pokeCommand};