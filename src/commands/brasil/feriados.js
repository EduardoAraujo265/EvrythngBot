import { SlashCommandBuilder } from 'discord.js';
import { getHolidays } from '../../services/brasilapi/holidays.js';
import { buildHolidaysEmbed } from '../../embeds/holidays.embed.js';
import { todayInBrazil } from '../../utils/dates.js';

export const data = new SlashCommandBuilder()
  .setName('feriados')
  .setDescription('Lista os feriados nacionais e mostra o próximo')
  .addIntegerOption((option) =>
    option
      .setName('ano')
      .setDescription('Ano da consulta (padrão: ano atual)')
      .setMinValue(1900)
      .setMaxValue(2199)
  );

export async function execute(interaction) {
  await interaction.deferReply();

  const today = todayInBrazil();
  const year = interaction.options.getInteger('ano') ?? Number(today.slice(0, 4));
  const holidays = await getHolidays(year);

  await interaction.editReply({ embeds: [buildHolidaysEmbed(year, holidays, today)] });
}
