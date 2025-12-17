import {
  aternosStart,
  aternosStatus,
} from "../services/aternos.service.js";
import { ensureAternos } from "../services/aternos.ensure.js";

export async function handleAternosCommand(interaction) {
  const sub = interaction.options.getSubcommand();

  await interaction.deferReply();

  try {
    await ensureAternos();

    if (sub === "start") {
      await interaction.editReply("⏳ Starting server...");
      const res = await aternosStart();
      await interaction.editReply(res);
    }

    if (sub === "status") {
      await interaction.editReply("⏳ Checking status...");
      const res = await aternosStatus();
      await interaction.editReply(res);
    }
  } catch (err) {
    console.error(err);
    await interaction.editReply("💥 Aternos error");
  }
}