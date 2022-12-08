import {Collection} from "discord.js";
import {pokeSlashCommand} from "./poke";
import {decideSlashCommand} from "./decide";

export const commands = new Collection();

commands.set("poke", pokeSlashCommand);
commands.set("decide", decideSlashCommand);

export const formattedCommands = [pokeSlashCommand.data.toJSON(), decideSlashCommand.data.toJSON()];
