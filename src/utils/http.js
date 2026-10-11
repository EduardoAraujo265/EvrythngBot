import { HttpError } from './errors.js';

// fetch com timeout e erro padronizado.
export async function fetchJson(url, { timeoutMs = 8000 } = {}) {
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });

  if (!res.ok) {
    throw new HttpError(res.status, new URL(url).hostname);
  }
  return res.json();
}
