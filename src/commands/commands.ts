import {Collection} from "discord.js";
import {pokeSlashCommand} from "./poke";

export const commands = new Collection();

commands.set("poke", pokeSlashCommand);

export const formattedCommands = [pokeSlashCommand.data.toJSON()];
