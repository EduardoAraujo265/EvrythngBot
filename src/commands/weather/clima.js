import { SlashCommandBuilder } from 'discord.js';
import { getWeather } from '../../services/weather/index.js';
import { buildWeatherEmbed } from '../../embeds/weather.embed.js';

export const data = new SlashCommandBuilder()
  .setName('clima')
  .setDescription('Mostra o clima atual de uma cidade')
  .addStringOption((option) =>
    option.setName('cidade').setDescription('Ex: Rio de Janeiro').setRequired(true)
  );

export async function execute(interaction) {
  await interaction.deferReply(); // a API pode demorar mais de 3s

  const city = interaction.options.getString('cidade', true);
  const weather = await getWeather(city); // erros são tratados em events/interactionCreate.js

  await interaction.editReply({ embeds: [buildWeatherEmbed(weather)] });
}
