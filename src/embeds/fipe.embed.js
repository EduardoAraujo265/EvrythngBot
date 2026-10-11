import { EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/constants.js';
import { orDash, truncate } from '../utils/format.js';

const MAX_ROWS = 15;
const ZERO_KM = 32000; // a FIPE usa 32000 como "ano" de veículo zero km

export function buildFipeEmbed(v) {
  const rows = v.precos
    .slice(0, MAX_ROWS)
    .map((p) => `**${p.ano === ZERO_KM ? 'Zero km' : p.ano}** · ${orDash(p.combustivel)} — ${orDash(p.valor)}`);

  const extra = v.precos.length - MAX_ROWS;
  if (extra > 0) rows.push(`… e mais ${extra} ano(s)`);

  return new EmbedBuilder()
    .setColor(COLORS.brasil)
    .setTitle(truncate(`🚗 ${orDash(v.marca)} ${orDash(v.modelo)}`, 256))
    .setDescription(rows.join('\n'))
    .addFields(
      { name: 'Código FIPE', value: v.codigoFipe, inline: true },
      { name: 'Referência', value: orDash(v.mesReferencia), inline: true }
    )
    .setFooter({ text: 'Dados: Tabela FIPE via BrasilAPI' });
}
