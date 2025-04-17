import { SlashCommandBuilder, } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { type CommandType, FISH, FLYINGFISH, SALMON } from "./utils.ts";


export default {
    data: new SlashCommandBuilder()
        .setName('getcard')
        .setDescription('Get all card info'),

    /**
     * Reply with category reward % for all cards
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction: ChatInputCommandInteraction) {
        const cards = {
            "fish": FISH, 
            "flying fish": FLYINGFISH, 
            "salmon": SALMON
        };

        let cardInfo = "";

        // each card and each category in the card, append info to cardInfo
        for(const [card, cardCategory] of Object.entries(cards)) {
            cardInfo += `## ${card}\n`;

            for(const [category, percent] of Object.entries(cardCategory)) {
                cardInfo += `- ${category}: ${percent}%\n`
            };

            cardInfo += "-----------\n";
        };

        await interaction.reply(cardInfo);
    },
} as CommandType;