import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const commandsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'commands');
const body = [];

for (const file of readdirSync(commandsDir).filter((f) => f.endsWith('.js'))) {
  const command = await import(pathToFileURL(path.join(commandsDir, file)).href);
  body.push(command.data.toJSON());
}

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;
const rest = new REST().setToken(DISCORD_TOKEN);

const route = GUILD_ID
  ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID) // instantâneo
  : Routes.applicationCommands(CLIENT_ID); // global (pode levar até 1h)

await rest.put(route, { body });
console.log(`✅ ${body.length} comandos registrados (${GUILD_ID ? 'servidor' : 'global'})`);
