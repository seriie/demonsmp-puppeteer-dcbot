import { writeServerState } from "../helpers/serverState.js";
import { mylogs } from "../lib/utils/mylogs.js";
import { getStatusSafe } from "../helpers/aternos.server.js";

let running = false;

let running = false

export async function startAternosPoller() {
  if (running) return
  running = true

  async function poll() {
    try {
      const status = await getStatusSafe()
      await writeServerState(status)
      console.log("🔄 Server status updated")
    } catch (err) {
      console.log("⚠️ Poller error:", err.message)
    } finally {
      setTimeout(poll, 60_000)
    }
  }

  poll()
}
