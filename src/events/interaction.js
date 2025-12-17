import { handleAternosCommand } from "../commands/aternos.handler.js"

export default {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return

    await handleAternosCommand(interaction)
  }
}