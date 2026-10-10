import 'dotenv/config';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Carrega automaticamente tudo que estiver em src/commands
const commandsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'commands');
for (const file of readdirSync(commandsDir).filter((f) => f.endsWith('.js'))) {
  const command = await import(pathToFileURL(path.join(commandsDir, file)).href);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, (c) => {
  console.log(`✅ Online como ${c.user.tag} com ${client.commands.size} comandos`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(`Erro em /${interaction.commandName}:`, err);
    const msg = '⚠️ Algo deu errado ao buscar os dados. Tente novamente em instantes.';
    if (interaction.deferred || interaction.replied) await interaction.editReply(msg);
    else await interaction.reply({ content: msg, ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
