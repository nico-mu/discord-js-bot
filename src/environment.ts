import dotenv from "dotenv";

dotenv.config();

export const environment = {
    token: process.env.TOKEN,
    applicationId: process.env.APPLICATION_ID,
    guildId: process.env.GUILD_ID,
    clientSecret: process.env.CLIENT_SECRET,
}