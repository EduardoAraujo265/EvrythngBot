// Códigos WMO (usados pela Open-Meteo) -> [descrição, emoji]
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

export function describeWeather(code) {
  const [description, emoji] = WMO[code] ?? ['Condição desconhecida', '🌡️'];
  return { description, emoji };
}
