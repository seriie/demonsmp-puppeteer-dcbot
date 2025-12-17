import { getStatus } from "../helpers/aternos.server.js";
import { writeServerState } from "../helpers/serverState.js";

let running = false;

export function startAternosPoller() {
  if (running) return;
  running = true;
  console.log("Starting aternos poller")

  setInterval(async () => {
    try {
      const status = await getStatus();
      if (!status) return;

      await writeServerState(status);
      console.log("🔄 Server status updated");
    } catch (err) {
      console.error("❌ Poller error:", err);
    }
  }, 60_000);
}
