import 'dotenv/config';

// Este projeto usa fetch nativo e top-level await.
const nodeMajor = Number(process.versions.node.split('.')[0]);
if (nodeMajor < 18) {
  console.error(`❌ Node ${process.versions.node} é antigo demais. Use Node 18 ou superior.`);
  process.exit(1);
}

const required = ['DISCORD_TOKEN', 'CLIENT_ID'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`❌ Variáveis de ambiente ausentes: ${missing.join(', ')}`);
  console.error('   Copie .env.example para .env e preencha os valores.');
  process.exit(1);
}

export const env = {
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID || null, // opcional
};
