import { TTL } from '../../config/constants.js';
import { cached } from '../../utils/cache.js';
import { brasilApiGet } from './client.js';

export function getHolidays(year) {
  return cached(`holidays:${year}`, TTL.holidays, async () => {
    const list = await brasilApiGet(`/feriados/v1/${year}`, `❌ Não encontrei feriados para **${year}**.`);

    return list
      .map((h) => ({ date: h.date, name: h.name }))
      .sort((a, b) => a.date.localeCompare(b.date));
  });
}
