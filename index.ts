import dotenv from 'dotenv';
import {client} from "./src/client";
import {registerCommands} from "./src/utils/command-execute-utils";

dotenv.config();

client.login(process.env.TOKEN);

registerCommands(process.env.APPLICATION_ID!, process.env.GUILD_ID!, process.env.TOKEN!);
