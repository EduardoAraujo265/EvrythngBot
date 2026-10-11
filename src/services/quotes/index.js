import { API, TTL } from '../../config/constants.js';
import { cached } from '../../utils/cache.js';
import { fetchJson } from '../../utils/http.js';

// A AwesomeAPI devolve a data no horário de Brasília (UTC-3).
function parseQuote(raw) {
  return {
    price: Number(raw.bid),
    high: Number(raw.high),
    low: Number(raw.low),
    change: Number(raw.pctChange),
    updatedAt: new Date(`${raw.create_date.replace(' ', 'T')}-03:00`),
  };
}

export function getQuotes() {
  return cached('quotes', TTL.quotes, async () => {
    const data = await fetchJson(API.quotes);
    return {
      dolar: parseQuote(data.USDBRL),
      bitcoin: parseQuote(data.BTCBRL),
    };
  });
}
