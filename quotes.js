import { cached } from './cache.js';

// AwesomeAPI: gratuita, sem chave, focada em cotações brasileiras.
const URL = 'https://economia.awesomeapi.com.br/json/last/USD-BRL,BTC-BRL';
const TTL = 60_000; // 1 minuto

export async function getQuotes() {
  return cached('quotes', TTL, async () => {
    const res = await fetch(URL);
    if (!res.ok) throw new Error(`AwesomeAPI respondeu ${res.status}`);
    const data = await res.json();

    const parse = (q) => ({
      price: Number(q.bid),
      high: Number(q.high),
      low: Number(q.low),
      change: Number(q.pctChange),
      updatedAt: new Date(q.create_date.replace(' ', 'T') + '-03:00'),
    });

    return { dolar: parse(data.USDBRL), bitcoin: parse(data.BTCBRL) };
  });
}
