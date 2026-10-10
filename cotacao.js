import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getQuotes } from '../services/quotes.js';

export const data = new SlashCommandBuilder()
  .setName('cotacao')
  .setDescription('Cotação do dólar e do bitcoin em reais')
  .addStringOption((o) =>
    o
      .setName('moeda')
      .setDescription('Qual cotação mostrar (padrão: todas)')
      .addChoices(
        { name: 'Dólar (USD → BRL)', value: 'dolar' },
        { name: 'Bitcoin (BTC → BRL)', value: 'bitcoin' },
        { name: 'Todas', value: 'todas' }
      )
  );

const brl = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const arrow = (pct) => (pct >= 0 ? `📈 +${pct.toFixed(2)}%` : `📉 ${pct.toFixed(2)}%`);

function field(label, q) {
  return {
    name: label,
    value: `**${brl(q.price)}**\n${arrow(q.change)}\nMáx ${brl(q.high)} · Mín ${brl(q.low)}`,
    inline: true,
  };
}

export async function execute(interaction) {
  await interaction.deferReply();

  const choice = interaction.options.getString('moeda') ?? 'todas';
  const quotes = await getQuotes();

  const embed = new EmbedBuilder()
    .setColor(0xf1c40f)
    .setTitle('💱 Cotações em tempo real')
    .setFooter({ text: 'Dados: AwesomeAPI' })
    .setTimestamp(quotes.dolar.updatedAt);

  if (choice === 'dolar' || choice === 'todas') embed.addFields(field('💵 Dólar', quotes.dolar));
  if (choice === 'bitcoin' || choice === 'todas') embed.addFields(field('₿ Bitcoin', quotes.bitcoin));

  await interaction.editReply({ embeds: [embed] });
}
