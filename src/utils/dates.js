const TIMEZONE = 'America/Sao_Paulo';

// Data de hoje no Brasil, no formato 'YYYY-MM-DD'.
export function todayInBrazil() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TIMEZONE }).format(new Date());
}

// Dias entre duas datas 'YYYY-MM-DD' (b - a).
export function daysBetween(a, b) {
  const toUtc = (iso) => Date.UTC(...iso.split('-').map((n, i) => (i === 1 ? Number(n) - 1 : Number(n))));
  return Math.round((toUtc(b) - toUtc(a)) / 86_400_000);
}

// 'YYYY-MM-DD' -> 'qui', 'sex', ...
export function weekdayPt(iso) {
  return new Date(`${iso}T12:00:00Z`)
    .toLocaleDateString('pt-BR', { weekday: 'short', timeZone: 'UTC' })
    .replace('.', '');
}
