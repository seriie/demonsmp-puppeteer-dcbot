import { client } from "../client.js"
import { initAternos } from "../services/aternos.service.js"
import { startAternosPoller } from "../services/aternos.poller.js";

client.once("clientReady", async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);

  await initAternos();
  startAternosPoller();
})