import moment from "moment/moment";

export const remind = (message) => {
    // First, we want to extract the date and time from the message
    // You can specify the date and time in any format you want, but for this example we will assume it is in the format "YYYY-MM-DD HH:MM"
    const dateString = message.content.split(' ')[1];
    const timeString = message.content.split(' ')[2];

    // Next, we want to parse the date and time strings into moment objects
    const date = moment(dateString + ' ' + timeString, 'YYYY-MM-DD HH:mm');

    // Now, we want to check if the user specified a time zone in the message
    // If they did not, we will assume they want to use the default time zone (UTC)
    let timeZone = 'UTC';
    if (message.content.includes('timezone')) {
        // If the user specified a time zone, we will extract it from the message
        timeZone = message.content.split('timezone')[1].trim();
    }

    // Next, we want to convert the date and time to the specified time zone
    date.utc().tz(timeZone);

    // Finally, we want to set up a timer that will remind the user at the specified date and time
    // We will use the setTimeout() function for this
    setTimeout(() => {
        // When the timer fires, we want to send the user a message reminding them
        message.channel.send(`This is your reminder! The date and time you specified is: ${date.format('YYYY-MM-DD HH:mm')} ${timeZone}`);
    }, date.getTime() - Date.now());
};