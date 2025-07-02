import { Client, REST, Routes, type Interaction } from "discord.js";

import getCardInfo from "./commands/getCardInfo.ts";
import getCategory from "./commands/getCategory.ts";
import getBestCard from "./commands/getBestCard.ts";

import { type CommandType } from "./commands/utils.ts";

import dotenv from 'dotenv';
dotenv.config(); 

const clientID = process.env.clientID;
const token = process.env.token;
const testServerID = process.env.testServerID;

// set up client
export const CLIENT = new Client({ intents: [] });

const COMMANDS: Record<string, CommandType> = {
    "getcard": getCardInfo,
    "getcategories": getCategory,
    "bestcard": getBestCard
};

// set up REST module for slash commands
const rest = new REST().setToken(token!);

// after logging in, run this event 
CLIENT.on("ready", async () => {
    console.log(`Ready! Logged in as ${CLIENT.user!.tag}`);
});

// catch all slash commands 
CLIENT.on("interactionCreate", async(interaction: Interaction) => {
    // if not slash command
    if (!interaction.isChatInputCommand()) return;

    const command = COMMANDS[interaction.commandName];

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
    }
});

if (process.argv.length != 3 || (process.argv[2] != "test" && process.argv[2] != "prod")) {
    throw new Error("missing test / prod arg or too many args!");
}

// register commands and log into the bot:
(async () => {
    const commandBody = Object.values(COMMANDS).map(command => command.data.toJSON())
    // globally
    if (process.argv[2] === "prod") {
        rest.put(
            Routes.applicationCommands(clientID!),
            {
                body: commandBody
            }
        );
    }
    // per guild
    else {
        rest.put(
            Routes.applicationGuildCommands(clientID!, testServerID!),
            {
                body: commandBody
            }
        );
    }

    await CLIENT.login(token);
})();
