import { getStatus } from "../helpers/aternos.server.js";
import { writeServerState } from "../helpers/serverState.js";
import { mylogs } from "../lib/utils/mylogs.js";

let running = false;

export function startAternosPoller() {
  if (running) return;
  running = true;
  mylogs("⏳", "Starting aternos poller")

  setInterval(async () => {
    try {
      const status = await getStatus();
      if (!status) return;

      await writeServerState(status);
      mylogs("🔄", "Server status updated");
    } catch (err) {
      mylogs("❌", `Poller error: ${err}`);
    }
  }, 30_000);
}
