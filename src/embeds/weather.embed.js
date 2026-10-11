import { EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/constants.js';
import { describeWeather } from '../services/weather/codes.js';

export function buildWeatherEmbed(w) {
  const { description, emoji } = describeWeather(w.code);
  const place = [w.city, w.region].filter(Boolean).join(', ');

  return new EmbedBuilder()
    .setColor(COLORS.weather)
    .setTitle(`${emoji} ${place} — ${w.country}`)
    .setDescription(`**${description}**`)
    .addFields(
      { name: '🌡️ Temperatura', value: `${w.temp}°C (sensação ${w.feelsLike}°C)`, inline: true },
      { name: '⬆️ Máx / ⬇️ Mín', value: `${w.max}°C / ${w.min}°C`, inline: true },
      { name: '💧 Umidade', value: `${w.humidity}%`, inline: true },
      { name: '🌬️ Vento', value: `${w.wind} km/h`, inline: true },
      { name: '☔ Chance de chuva', value: `${w.rainChance}%`, inline: true }
    )
    .setFooter({ text: 'Dados: Open-Meteo' })
    .setTimestamp();
}
