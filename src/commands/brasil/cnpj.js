import { SlashCommandBuilder } from 'discord.js';
import { getCnpj } from '../../services/brasilapi/cnpj.js';
import { buildCnpjEmbed } from '../../embeds/cnpj.embed.js';
import { normalizeCnpj } from '../../utils/validators.js';

export const data = new SlashCommandBuilder()
  .setName('cnpj')
  .setDescription('Consulta os dados públicos de uma empresa pelo CNPJ')
  .addStringOption((option) =>
    option.setName('cnpj').setDescription('Ex: 00.000.000/0001-91').setRequired(true).setMinLength(14).setMaxLength(18)
  );

export async function execute(interaction) {
  await interaction.deferReply();

  const cnpj = normalizeCnpj(interaction.options.getString('cnpj', true));
  const company = await getCnpj(cnpj);

  await interaction.editReply({ embeds: [buildCnpjEmbed(company)] });
}
