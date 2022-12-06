import dotenv from 'dotenv';
import {client} from "./src/client";

dotenv.config();

client.login(process.env.TOKEN);