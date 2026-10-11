import { pathToFileURL } from 'node:url';
import { EVENTS_DIR } from '../config/paths.js';
import { listJsFiles } from '../utils/files.js';

// Registra no client cada arquivo de src/events (exporta name, once, execute).
export async function loadEvents(client) {
  for (const file of listJsFiles(EVENTS_DIR)) {
    const event = await import(pathToFileURL(file).href);
    const register = event.once ? 'once' : 'on';
    client[register](event.name, (...args) => event.execute(...args));
  }
}
