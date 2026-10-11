import { EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/constants.js';
import { brl, formatCep, formatCnpj, formatDateBR, orDash, truncate } from '../utils/format.js';

export function buildCnpjEmbed(c) {
  const active = /ativa/i.test(c.situacao ?? '');
  const e = c.endereco;

  const line1 = [e.logradouro, e.numero, e.complemento].filter(Boolean).join(', ');
  const cityUf = [e.municipio, e.uf].filter(Boolean).join(' / ');
  const line2 = [e.bairro, cityUf, e.cep ? `CEP ${formatCep(e.cep)}` : null].filter(Boolean).join(' · ');

  const embed = new EmbedBuilder()
    .setColor(active ? 0x2ecc71 : COLORS.brasil)
    .setTitle(truncate(`🏢 ${orDash(c.razaoSocial)}`, 256))
    .addFields(
      { name: 'CNPJ', value: formatCnpj(c.cnpj), inline: true },
      { name: 'Situação', value: `${active ? '✅' : '⚠️'} ${orDash(c.situacao)}`, inline: true },
      { name: 'Abertura', value: formatDateBR(c.abertura), inline: true },
      { name: 'Atividade principal', value: truncate(orDash(c.atividade), 1024) },
      { name: 'Natureza jurídica', value: truncate(orDash(c.naturezaJuridica), 1024), inline: true },
      { name: 'Porte', value: orDash(c.porte), inline: true },
      { name: 'Capital social', value: brl(c.capitalSocial), inline: true },
      { name: 'Endereço', value: truncate(orDash([line1, line2].filter(Boolean).join('\n')), 1024) }
    )
    .setFooter({ text: 'Dados públicos: Receita Federal via BrasilAPI' });

  if (c.nomeFantasia) embed.setDescription(`**${truncate(c.nomeFantasia, 200)}**`);
  return embed;
}
