// Cache simples em memória para não estourar o limite das APIs.
const MAX_ENTRIES = 500;
const store = new Map();

export async function cached(key, ttlMs, fetcher) {
  const hit = store.get(key);
  if (hit && Date.now() - hit.time < ttlMs) return hit.value;

  const value = await fetcher();

  store.delete(key);
  store.set(key, { value, time: Date.now() });
  if (store.size > MAX_ENTRIES) store.delete(store.keys().next().value); // descarta o mais antigo

  return value;
}
