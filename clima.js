import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { getWeather, describeWeather } from '../services/weather.js';

export const data = new SlashCommandBuilder()
  .setName('clima')
  .setDescription('Mostra o clima atual de uma cidade')
  .addStringOption((o) =>
    o.setName('cidade').setDescription('Ex: Rio de Janeiro').setRequired(true)
  );

export async function execute(interaction) {
  await interaction.deferReply(); // a API pode demorar mais de 3s

  const city = interaction.options.getString('cidade', true);

  try {
    const w = await getWeather(city);
    const [desc, emoji] = describeWeather(w.code);

    const embed = new EmbedBuilder()
      .setColor(0x3498db)
      .setTitle(`${emoji} ${w.city}${w.region ? `, ${w.region}` : ''} — ${w.country}`)
      .setDescription(`**${desc}**`)
      .addFields(
        { name: '🌡️ Temperatura', value: `${w.temp}°C (sensação ${w.feelsLike}°C)`, inline: true },
        { name: '⬆️ Máx / ⬇️ Mín', value: `${w.max}°C / ${w.min}°C`, inline: true },
        { name: '💧 Umidade', value: `${w.humidity}%`, inline: true },
        { name: '🌬️ Vento', value: `${w.wind} km/h`, inline: true },
        { name: '☔ Chance de chuva', value: `${w.rainChance ?? 0}%`, inline: true }
      )
      .setFooter({ text: 'Dados: Open-Meteo' })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    if (err.message === 'CITY_NOT_FOUND') {
      return interaction.editReply(`❌ Não encontrei a cidade **${city}**. Tente outro nome.`);
    }
    throw err; // o handler global cuida do resto
  }
}
