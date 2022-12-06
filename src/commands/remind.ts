import {differenceInMilliseconds, format, intervalToDuration, parse} from 'date-fns'
import {User} from "discord.js";
const { EmbedBuilder } = require('discord.js');

/**
 * remind command
 * reminds the user of something at a specified time
 *
 * @param user the user to remind
 * @param content the content of the reminder
 *      structure: !remind <message> <date> <time> <timezone>
 *      message: the message to remind the user of
 *      time: the time to remind the user at
 *      timezone: the timezone to remind the user at. It is optional and defaults to UTC
 * @param channel the channel to send the reminder in
 */
export const remind = (user: User, content: string, channel: any) => {
    const reminder = content.split(' ')[1];
    const dateString = content.split(' ')[2];
    const timeString = content.split(' ')[3];
    const timeZone = content.split(' ')[4] || 'UTC';

    // Next, we want to parse the date and time strings into moment objects
    const date = parse(dateString + ' ' + timeString, "dd.MM.yyyy HH:mm", new Date());
    const formattedDate = format(date, 'dd.MM.yyyy HH:mm');

    // Finally, we want to set up a timer that will remind the user at the specified date and time
    // We will use the setTimeout() function for this

    channel.send(`I will remind you at ${formattedDate} ${timeZone}`);

    const duration = differenceInMilliseconds(Date.now(), date);

    setTimeout(() => {
        // When the timer fires, we want to send the user a message reminding them
        const embed = new EmbedBuilder()
        .setTitle('Reminder for ' + user.username)
        .setDescription(`This is your reminder <@${user.id}> for "${reminder}"! The date and time you specified is: ${formattedDate} ${timeZone}`)
        .setColor('#0099ff')
            .setThumbnail(user.displayAvatarURL())
        user.send({ embeds: [embed] });
    }, duration);
}