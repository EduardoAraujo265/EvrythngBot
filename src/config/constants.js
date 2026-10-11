// URLs das APIs externas
export const API = {
  geocoding: 'https://geocoding-api.open-meteo.com/v1/search',
  forecast: 'https://api.open-meteo.com/v1/forecast',
  quotes: 'https://economia.awesomeapi.com.br/json/last/USD-BRL,BTC-BRL',
  brasilapi: 'https://brasilapi.com.br/api',
};

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

// Tempo de cache (ms) de cada serviço
export const TTL = {
  weather: 10 * MINUTE,
  quotes: 1 * MINUTE,
  cep: 24 * HOUR,
  cnpj: 6 * HOUR,
  holidays: 24 * HOUR,
  fipe: 6 * HOUR,
};

// Cores dos embeds
export const COLORS = {
  weather: 0x3498db,
  finance: 0xf1c40f,
  brasil: 0x009c3b,
};
