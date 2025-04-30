import { SlashCommandBuilder, } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { type CommandType, CARDS } from "./utils.ts";


export default {
    data: new SlashCommandBuilder()
        .setName('getcard')
        .setDescription('Get all card info'),

    /**
     * Reply with category reward % for all cards
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction: ChatInputCommandInteraction) {
        let cardInfo = "";

        // for each card and each category in the card, append info to cardInfo
        for(const [card, cardCategory] of Object.entries(CARDS)) {
            cardInfo += `## ${card}\n`;

            for(const [category, percent] of Object.entries(cardCategory)) {
                cardInfo += `- ${category}: ${percent}%\n`
            };

            cardInfo += "-----------\n";
        };

        await interaction.reply(cardInfo);
    },
} as CommandType;