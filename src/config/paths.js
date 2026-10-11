import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const COMMANDS_DIR = path.join(SRC_DIR, 'commands');
export const EVENTS_DIR = path.join(SRC_DIR, 'events');
