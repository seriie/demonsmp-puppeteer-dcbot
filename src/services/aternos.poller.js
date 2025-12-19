import { getStatus } from "../helpers/aternos.server.js";
import { writeServerState } from "../helpers/serverState.js";
import { mylogs } from "../lib/utils/mylogs.js";
import { skipAternosAds } from "../helpers/skipAternosAds.js";
import { getPage } from "../helpers/browser.js";

let running = false;

export function startAternosPoller() {
  if (running) return;
  running = true;
  mylogs("⏳", "Starting aternos poller")

  const page = await getPage();

  setInterval(async () => {
    try {
      const status = await getStatus(getPage);
      if (!status) return;

      await skipAternosAds(page);
      await writeServerState(status);
      mylogs("🔄", "Server status updated");
    } catch (err) {
      mylogs("❌", `Poller error: ${err}`);
    }
  }, 60_000);
}
