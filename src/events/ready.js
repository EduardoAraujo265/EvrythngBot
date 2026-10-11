import { Events } from 'discord.js';
import { env } from '../config/env.js';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client) {
  console.log(`✅ Online como ${client.user.tag} com ${client.commands.size} comando(s) carregado(s)`);

  // Confere se os comandos carregados também estão registrados no Discord.
  try {
    const guild = env.guildId ? await client.guilds.fetch(env.guildId) : null;
    const registered = guild
      ? await guild.commands.fetch()
      : await client.application.commands.fetch();
    const where = guild ? `servidor "${guild.name}"` : 'global';

    const missing = [...client.commands.keys()].filter(
      (cmdName) => !registered.some((c) => c.name === cmdName)
    );

    if (missing.length > 0) {
      console.warn(
        `⚠️ Não registrados no Discord (${where}): ${missing.map((n) => `/${n}`).join(', ')}. Rode "npm run deploy".`
      );
    } else if (client.commands.size > 0) {
      console.log(`✅ Comandos registrados no Discord (${where}).`);
    }
  } catch (err) {
    console.warn(`⚠️ Não foi possível verificar os comandos registrados: ${err.message}`);
    if (env.guildId) console.warn('   Confira o GUILD_ID e se o bot foi convidado para esse servidor.');
  }
}
