import { API, TTL } from '../../config/constants.js';
import { cached } from '../../utils/cache.js';
import { fetchJson } from '../../utils/http.js';
import { CityNotFoundError } from '../../utils/errors.js';

async function geocode(city) {
  const query = new URLSearchParams({ name: city, count: 1, language: 'pt', format: 'json' });
  const { results } = await fetchJson(`${API.geocoding}?${query}`);

  if (!results?.length) throw new CityNotFoundError(city);
  return results[0];
}

function fetchForecast({ latitude, longitude }) {
  const query = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: 1,
  });
  return fetchJson(`${API.forecast}?${query}`);
}

export function getWeather(city) {
  return cached(`weather:${city.trim().toLowerCase()}`, TTL.weather, async () => {
    const place = await geocode(city);
    const data = await fetchForecast(place);

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
      rainChance: data.daily.precipitation_probability_max[0] ?? 0,
    };
  });
}
