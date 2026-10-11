import { readdirSync } from 'node:fs';
import path from 'node:path';

// Lista recursivamente todos os arquivos .js de uma pasta.
export function listJsFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listJsFiles(fullPath);
    return entry.name.endsWith('.js') ? [fullPath] : [];
  });
}
