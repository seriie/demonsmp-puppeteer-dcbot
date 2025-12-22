import { writeServerState } from "../helpers/serverState.js";
import { mylogs } from "../lib/utils/mylogs.js";
import { getStatusSafe } from "../helpers/aternos.server.js";

let running = false;

export async function startAternosPoller() {
  if (running) return;
  running = true;
  mylogs("⏳", "Starting aternos poller");

  let polling = false;

  setInterval(async () => {
    if (polling) return;
    polling = true;

    try {
      const status = await getStatusSafe();
      await writeServerState(status);
      console.log("🔄 Server status updated");
    } catch (e) {
      console.log("⚠️ Poller error:", e.message);
    } finally {
      polling = false;
    }
  }, 30_000);
}
