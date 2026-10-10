import { cached } from './cache.js';

// Open-Meteo: gratuita, sem chave. Geocoding + previsão.
const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const TTL = 10 * 60_000; // 10 minutos

// Códigos WMO -> descrição + emoji
const WMO = {
  0: ['Céu limpo', '☀️'],
  1: ['Predominantemente limpo', '🌤️'],
  2: ['Parcialmente nublado', '⛅'],
  3: ['Nublado', '☁️'],
  45: ['Neblina', '🌫️'],
  48: ['Neblina com geada', '🌫️'],
  51: ['Garoa leve', '🌦️'],
  53: ['Garoa moderada', '🌦️'],
  55: ['Garoa forte', '🌦️'],
  61: ['Chuva fraca', '🌧️'],
  63: ['Chuva moderada', '🌧️'],
  65: ['Chuva forte', '🌧️'],
  80: ['Pancadas de chuva', '🌧️'],
  81: ['Pancadas moderadas', '🌧️'],
  82: ['Pancadas violentas', '⛈️'],
  95: ['Tempestade', '⛈️'],
  96: ['Tempestade com granizo', '⛈️'],
  99: ['Tempestade com granizo forte', '⛈️'],
};

export const describeWeather = (code) => WMO[code] ?? ['Condição desconhecida', '🌡️'];

export async function getWeather(city) {
  return cached(`weather:${city.toLowerCase()}`, TTL, async () => {
    const geoRes = await fetch(
      `${GEO_URL}?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`
    );
    const geo = await geoRes.json();
    const place = geo.results?.[0];
    if (!place) throw new Error('CITY_NOT_FOUND');

    const params = new URLSearchParams({
      latitude: place.latitude,
      longitude: place.longitude,
      current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
      timezone: 'auto',
      forecast_days: 1,
    });
    const res = await fetch(`${FORECAST_URL}?${params}`);
    if (!res.ok) throw new Error(`Open-Meteo respondeu ${res.status}`);
    const data = await res.json();

    return {
      city: place.name,
      region: place.admin1,
      country: place.country,
      temp: data.current.temperature_2m,
      feelsLike: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      wind: data.current.wind_speed_10m,
      code: data.current.weather_code,
      max: data.daily.temperature_2m_max[0],
      min: data.daily.temperature_2m_min[0],
      rainChance: data.daily.precipitation_probability_max[0],
    };
  });
}
