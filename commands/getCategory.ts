import { SlashCommandBuilder, } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { type CommandType, CATEGORIES } from "./utils.ts";


export default {
    data: new SlashCommandBuilder()
        .setName('getcategories')
        .setDescription('Get list of categories to choose from'),

    /**
     * Reply with list of available categories for rewards
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction: ChatInputCommandInteraction) {
        let categories = "## Cashback categories\n";

        for(const category of CATEGORIES) {
            categories += `- ${category}\n`;
        }

        await interaction.reply(categories);
    },
} as CommandType;