import { EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/constants.js';
import { brl, signedPercent } from '../utils/format.js';

function quoteField(label, quote) {
  return {
    name: label,
    value: `**${brl(quote.price)}**\n${signedPercent(quote.change)}\nMáx ${brl(quote.high)} · Mín ${brl(quote.low)}`,
    inline: true,
  };
}

// choice: 'dolar' | 'bitcoin' | 'todas'
export function buildQuotesEmbed(quotes, choice = 'todas') {
  const embed = new EmbedBuilder()
    .setColor(COLORS.finance)
    .setTitle('💱 Cotações em tempo real')
    .setFooter({ text: 'Dados: AwesomeAPI' })
    .setTimestamp(quotes.dolar.updatedAt);

  if (choice === 'dolar' || choice === 'todas') embed.addFields(quoteField('💵 Dólar', quotes.dolar));
  if (choice === 'bitcoin' || choice === 'todas') embed.addFields(quoteField('₿ Bitcoin', quotes.bitcoin));

  return embed;
}
