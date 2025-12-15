import { handleAternosCommand } from "../commands/aternos.handler.js"

export async function interactionCreate(interaction) {
  if (!interaction.isChatInputCommand()) return

  if (interaction.commandName === "aternos") {
    await handleAternosCommand(interaction)
  }
}