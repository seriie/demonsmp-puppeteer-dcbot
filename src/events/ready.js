import { client } from "../client.js"
import { initAternos } from "../services/aternos.service.js"
import { mylogs } from "../lib/utils/mylogs.js";

client.once("clientReady", async () => {
  mylogs("🤖", `Logged in as ${client.user.tag}`);

  await initAternos();
})