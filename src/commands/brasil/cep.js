import { SlashCommandBuilder } from 'discord.js';
import { getCep } from '../../services/brasilapi/cep.js';
import { buildCepEmbed } from '../../embeds/cep.embed.js';
import { normalizeCep } from '../../utils/validators.js';

export const data = new SlashCommandBuilder()
  .setName('cep')
  .setDescription('Consulta um endereço pelo CEP')
  .addStringOption((option) =>
    option.setName('cep').setDescription('Ex: 01001-000').setRequired(true).setMinLength(8).setMaxLength(9)
  );

export async function execute(interaction) {
  await interaction.deferReply();

  const cep = normalizeCep(interaction.options.getString('cep', true));
  const address = await getCep(cep);

  await interaction.editReply({ embeds: [buildCepEmbed(address)] });
}
