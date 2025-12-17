import { Events } from "discord.js"
import { handleAternosCommand } from "../commands/aternos.handler.js"

export function registerInteraction(client) {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    try {
      await handleAternosCommand(interaction)
    } catch (err) {
      console.error(err)

      if (interaction.deferred || interaction.replied) {
        await interaction.editReply("💥 Internal error")
      } else {
        await interaction.reply("💥 Internal error")
      }
    }
  })
}