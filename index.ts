import {client} from "./src/client";
import {registerCommands} from "./src/utils/command-execute-utils";
import {environment} from "./src/environment";

client.login(environment.token);

registerCommands(environment.applicationId!, environment.guildId!, environment.token!);

