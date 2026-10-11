import { Collection } from 'discord.js';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { COMMANDS_DIR } from '../config/paths.js';
import { listJsFiles } from '../utils/files.js';

// Percorre src/commands/** e devolve uma Collection { nome -> módulo do comando }.
export async function loadCommands() {
  const commands = new Collection();

  if (!existsSync(COMMANDS_DIR)) {
    console.error(`❌ Pasta de comandos não encontrada: ${COMMANDS_DIR}`);
    return commands;
  }

  const files = listJsFiles(COMMANDS_DIR);
  console.log(`📂 Procurando comandos em ${COMMANDS_DIR} (${files.length} arquivo(s) .js)`);

  for (const file of files) {
    const shortName = path.relative(COMMANDS_DIR, file);
    try {
      const command = await import(pathToFileURL(file).href);

      if (!command.data || !command.execute) {
        console.warn(`   ⚠️ ${shortName} ignorado: precisa exportar "data" e "execute".`);
        continue;
      }
      commands.set(command.data.name, command);
      console.log(`   ✔ /${command.data.name}  (${shortName})`);
    } catch (err) {
      console.error(`   ✖ Falha ao carregar ${shortName}:`, err);
    }
  }

  if (commands.size === 0) {
    console.error('❌ Nenhum comando carregado. Confira se existem arquivos em src/commands/<categoria>/.');
  }
  return commands;
}
