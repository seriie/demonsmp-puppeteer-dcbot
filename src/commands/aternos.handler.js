import { aternosStart, aternosStatus } from "../services/aternos.service.js"

export async function handleAternosCommand(interaction) {
  const sub = interaction.options.getSubcommand()

  await interaction.deferReply({ ephemeral: false })

  if (sub === "start") {
    const res = await aternosStart()
    await interaction.editReply(res)
  }

  if (sub === "status") {
    const res = await aternosStatus()
    await interaction.editReply(res)
  }
}
