import { Client } from "discord.js";
import { REST } from "discord.js";
import { Routes } from "discord.js";

import dotenv from 'dotenv';
dotenv.config(); 

const clientID = process.env.clientID
const token = process.env.token

// set up client
export const CLIENT = new Client({ intents: [] });
const COMMANDS = []

// set up REST module for slash commands
const rest = new REST().setToken(token!);

// register commands and log into the bot:
(async () => {
    rest.put(
        Routes.applicationCommands(clientID!),
        {
            body: COMMANDS
        }
    );
    await CLIENT.login(token);

    CLIENT.on("ready", async () => {
        console.log(`Ready! Logged in as ${CLIENT.user!.tag}`);
    });
})();