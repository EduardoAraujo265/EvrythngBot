import { SlashCommandBuilder } from 'discord.js';
import { getQuotes } from '../../services/quotes/index.js';
import { buildQuotesEmbed } from '../../embeds/quotes.embed.js';

export const data = new SlashCommandBuilder()
  .setName('cotacao')
  .setDescription('Cotação do dólar e do bitcoin em reais')
  .addStringOption((option) =>
    option
      .setName('moeda')
      .setDescription('Qual cotação mostrar (padrão: todas)')
      .addChoices(
        { name: 'Dólar (USD → BRL)', value: 'dolar' },
        { name: 'Bitcoin (BTC → BRL)', value: 'bitcoin' },
        { name: 'Todas', value: 'todas' }
      )
  );

export async function execute(interaction) {
  await interaction.deferReply();

  const choice = interaction.options.getString('moeda') ?? 'todas';
  const quotes = await getQuotes();

  await interaction.editReply({ embeds: [buildQuotesEmbed(quotes, choice)] });
}
