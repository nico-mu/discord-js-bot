import {EmbedBuilder, GuildMember} from "discord.js";

export function poke(member: GuildMember, message: string, title: string) {
    if (member) {
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(message)
            .setColor('#ff0000')
            .setThumbnail(member.displayAvatarURL());
        // Send the embed to the user
        member.send({embeds: [embed]});
    }
}