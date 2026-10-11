import { env } from './config/env.js';
import { createClient } from './core/client.js';
import { loadCommands } from './core/loadCommands.js';
import { loadEvents } from './core/loadEvents.js';

const client = createClient();
client.commands = await loadCommands();
await loadEvents(client);

await client.login(env.token);
