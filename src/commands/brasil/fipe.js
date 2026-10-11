import { SlashCommandBuilder } from 'discord.js';
import { getFipePrice } from '../../services/brasilapi/fipe.js';
import { buildFipeEmbed } from '../../embeds/fipe.embed.js';
import { normalizeFipeCode } from '../../utils/validators.js';

export const data = new SlashCommandBuilder()
  .setName('fipe')
  .setDescription('Consulta o preço de um veículo na tabela FIPE pelo código')
  .addStringOption((option) =>
    option.setName('codigo').setDescription('Código FIPE, ex: 001004-9').setRequired(true).setMinLength(7).setMaxLength(8)
  );

export async function execute(interaction) {
  await interaction.deferReply();

  const code = normalizeFipeCode(interaction.options.getString('codigo', true));
  const vehicle = await getFipePrice(code);

  await interaction.editReply({ embeds: [buildFipeEmbed(vehicle)] });
}
