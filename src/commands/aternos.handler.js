import {
  aternosStart,
  aternosStatus,
} from "../services/aternos.service.js";
import { ensureAternos } from "../services/aternos.ensure.js";
import { withTimeout } from "../lib/utils/withTimeout.js"
import { mylogs } from "../lib/utils/mylogs.js";

export async function handleAternosCommand(interaction) {
  const sub = interaction.options.getSubcommand()

  await interaction.deferReply()

  try {
    await withTimeout(
      ensureAternos(),
      25_000,
      "Aternos init timeout"
    )

    if (sub === "start") {
      await interaction.editReply("⏳ Starting server...")
      const res = await aternosStart()
      await interaction.editReply(res.message)
    }

    if (sub === "status") {
      await interaction.editReply("⏳ Checking status...")
      const res = await aternosStatus()
      await interaction.editReply(res)
    }

  } catch (err) {
    mylogs("❌",  `Aternos error: ${err}`)
    await interaction.editReply("💥 Aternos stuck / timeout")
  }
}
