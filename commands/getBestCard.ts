import { SlashCommandBuilder, } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { type CommandType, CARDS, CATEGORIES } from "./utils.ts";
 

export default {
    data: new SlashCommandBuilder()
        .setName('bestcard')
        .setDescription('Given a category, return best card to use.')
        .addStringOption((arg) => arg.setName("category")
            .setDescription("Name of category you want to find best card for")
            .setRequired(true)),

    /**
     * Given a category, reply with card with best cashback for it 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction: ChatInputCommandInteraction) {
        const category = interaction.options.getString("category", true);

        // if given category is not a valid category
        if (CATEGORIES.includes(category) === false) {
            await interaction.reply(`${category} was not found in the category list.`);
            return;
        }

        let bestCard: [string, number] = ["card", 0];

        // look through each card to find best %
        for(const [card, cardCategory] of Object.entries(CARDS)) {
            if (cardCategory.hasOwnProperty(category) && bestCard[1] < cardCategory[category]) {
                bestCard = [card, cardCategory[category]];
            }
        };

        await interaction.reply(`For ${category}, use \`${bestCard[0]}\` (gets \`${bestCard[1]}%\` back)`);
    },
} as CommandType;