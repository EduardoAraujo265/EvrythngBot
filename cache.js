// Cache simples em memória para não estourar o limite das APIs.
const store = new Map();

export async function cached(key, ttlMs, fetcher) {
  const hit = store.get(key);
  if (hit && Date.now() - hit.time < ttlMs) return hit.value;

  const value = await fetcher();
  store.set(key, { value, time: Date.now() });
  return value;
}
