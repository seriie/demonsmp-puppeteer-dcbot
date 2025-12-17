import {
  aternosStart,
  aternosStatus,
  initAternos,
} from "../services/aternos.service.js";
import { ensureAternos } from "../services/aternos.ensure.js";

export async function handleAternosCommand(interaction) {
  const sub = interaction.options.getSubcommand();

  await interaction.deferReply();

  initAternos;

  try {
    await ensureAternos();

    if (sub === "start") {
      interaction.editReply("⏳ Starting server...");

      aternosStart()
        .then((res) => interaction.editReply(res))
        .catch(() => interaction.editReply("❌ Gagal start server"));
    }

    if (sub === "status") {
      interaction.editReply("⏳ Starting server...");

      aternosStatus()
        .then((res) => interaction.editReply(res))
        .catch(() => interaction.editReply("❌ Gagal start server"));
    }
  } catch (err) {
    console.error(err);
    await interaction.editReply("💥 Aternos error");
  }
}
