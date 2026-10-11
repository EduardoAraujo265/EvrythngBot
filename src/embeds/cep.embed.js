import { EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/constants.js';
import { formatCep, orDash } from '../utils/format.js';

export function buildCepEmbed(a) {
  const embed = new EmbedBuilder()
    .setColor(COLORS.brasil)
    .setTitle(`📮 CEP ${formatCep(a.cep)}`)
    .addFields(
      { name: 'Logradouro', value: orDash(a.street) },
      { name: 'Bairro', value: orDash(a.neighborhood), inline: true },
      { name: 'Cidade / UF', value: `${orDash(a.city)} / ${orDash(a.state)}`, inline: true }
    )
    .setFooter({ text: `Dados: BrasilAPI${a.service ? ` · fonte: ${a.service}` : ''}` });

  if (a.latitude && a.longitude) {
    embed.addFields({
      name: '🗺️ Mapa',
      value: `[Abrir no Google Maps](https://www.google.com/maps?q=${a.latitude},${a.longitude})`,
    });
  }
  return embed;
}
