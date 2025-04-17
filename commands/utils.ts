import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import dotenv from 'dotenv';

dotenv.config(); 

export type CommandType = {
    // contains data about the command, such as name and cmd description
    data: SlashCommandBuilder;

    /**
     * Executes a Discord slash command
     * @param {ChatInputCommandInteraction} interaction 
     */
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>; 
};

const quarterly: string = process.env.quarterly!;
export const CATEGORIES = [
    "dining", 
    "delivery", 
    "cafe", 
    "bar",
    "bakery",
    "drugstore",
    "entertainment", 
    "concerts", 
    {quarterly},
    "grocery",
    "other"
];

export const FISH = {
    "dining": 3,
    "delivery": 3,
    "cafe": 3, 
    "bar": 3,
    "drugstore": 3,
    "other": 1.5
};

export const FLYINGFISH = {
    [quarterly]: 5,
    "dining": 3,
    "delivery": 3,
    "cafe": 3, 
    "bar": 3,
    "drugstore": 3,
    "other": 1
};

export const SALMON = {
    "dining": 3, 
    "delivery": 3, 
    "cafe": 3, 
    "bar": 3,
    "bakery": 3,
    "entertainment": 3, 
    "concerts": 3, 
    "grocery": 3,
    "other": 1
};