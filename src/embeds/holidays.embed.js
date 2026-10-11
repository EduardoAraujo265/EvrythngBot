import { EmbedBuilder } from 'discord.js';
import { COLORS } from '../config/constants.js';
import { daysBetween, weekdayPt } from '../utils/dates.js';
import { formatDateBR } from '../utils/format.js';

// today: 'YYYY-MM-DD' (hoje no Brasil)
export function buildHolidaysEmbed(year, holidays, today) {
  const isCurrentYear = String(year) === today.slice(0, 4);

  const lines = holidays.map((h) => {
    const line = `**${formatDateBR(h.date).slice(0, 5)}** · ${weekdayPt(h.date)} — ${h.name}`;
    return isCurrentYear && h.date < today ? `~~${line}~~` : line;
  });

  const parts = [];
  if (isCurrentYear) {
    const next = holidays.find((h) => h.date >= today);
    if (next) {
      const days = daysBetween(today, next.date);
      const when = days === 0 ? '**hoje**' : days === 1 ? '**amanhã**' : `em **${days} dias**`;
      parts.push(`📌 Próximo feriado: **${next.name}**, ${when}.\n`);
    } else {
      parts.push('📌 Não há mais feriados nacionais neste ano.\n');
    }
  }
  parts.push(lines.join('\n') || 'Nenhum feriado encontrado.');

  return new EmbedBuilder()
    .setColor(COLORS.brasil)
    .setTitle(`📅 Feriados nacionais de ${year}`)
    .setDescription(parts.join('\n'))
    .setFooter({ text: 'Dados: BrasilAPI · apenas feriados nacionais' });
}
