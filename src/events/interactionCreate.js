import { Events, MessageFlags } from 'discord.js';
import { UserError } from '../utils/errors.js';

export const name = Events.InteractionCreate;
export const once = false;

// UserError já traz uma mensagem pronta; qualquer outro erro vira uma mensagem genérica.
function toUserMessage(err) {
  if (err instanceof UserError) return err.message;
  return '⚠️ Algo deu errado ao buscar os dados. Tente novamente em instantes.';
}

export async function execute(interaction) {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    if (!(err instanceof UserError)) {
      console.error(`Erro em /${interaction.commandName}:`, err); // só erros inesperados
    }
    const content = toUserMessage(err);

    if (interaction.deferred || interaction.replied) {
      await interaction.editReply({ content, embeds: [] });
    } else {
      await interaction.reply({ content, flags: MessageFlags.Ephemeral });
    }
  }
}
