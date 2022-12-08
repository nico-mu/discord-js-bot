import {CommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";

const decideCommand = async (interaction: CommandInteraction) => {
    if (interaction && interaction.isCommand() && interaction.commandName === "decide") {
        const opt = interaction.options;
        const options = opt.get("options");
        if (!options) {
            await interaction.reply("Please provide an option!");
            return;
        }
        const optionValue = options.value as string;
        if (!optionValue) {
            await interaction.reply("Please provide an option!");
            return;
        }
        const optionValues = optionValue.split(",");
        const fields = optionValues.map((value, index) => {
            return {name: `Option ${index + 1}`, value: value};
        });
        const embed = new EmbedBuilder()
            .setTitle("I decide...")
            .setDescription("I am deciding for you...")
            .setColor('#FEDD00')
            .setThumbnail(interaction.user.displayAvatarURL())
            .setFields(fields);
        await interaction.reply({embeds: [embed]}).then(async () => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            const randomIndex = Math.floor(Math.random() * optionValues.length);
            fields[randomIndex].value = `__**${fields[randomIndex].value}**__`;
            const embed = new EmbedBuilder().setTitle("I decided").setDescription("I have decided that '" + optionValues[randomIndex] + "' is the best option for you!").setFields(fields).setColor('#2A52BE').setThumbnail(interaction.user.displayAvatarURL());
            await interaction.editReply({embeds: [embed]});
        });
    }
}


export const decideSlashCommand = {data: new SlashCommandBuilder().setName("decide").setDescription("Decides between options. Separate options with commas.")
        .addStringOption(option => option.setName("options").setDescription("The options on which to decide on. Seperate with commas: 'o1,o2,o3'").setRequired(true)), execute: decideCommand};