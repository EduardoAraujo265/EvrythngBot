// Registra os slash commands na API do Discord. Rode com: npm run deploy
import { REST, Routes } from 'discord.js';
import { env } from '../src/config/env.js';
import { loadCommands } from '../src/core/loadCommands.js';

const commands = await loadCommands();
const body = commands.map((command) => command.data.toJSON());

const rest = new REST().setToken(env.token);
const route = env.guildId
  ? Routes.applicationGuildCommands(env.clientId, env.guildId) // instantâneo
  : Routes.applicationCommands(env.clientId); // global (pode levar até 1h)

await rest.put(route, { body });
console.log(`✅ ${body.length} comandos registrados (${env.guildId ? 'servidor' : 'global'})`);
