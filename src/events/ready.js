import { client } from "../client.js"
import { initAternos } from "../services/aternos.service.js"

client.once("ready", async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);

  await initAternos();
})