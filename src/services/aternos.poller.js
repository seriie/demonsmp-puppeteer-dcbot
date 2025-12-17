import { getStatus } from "../helpers/aternos.server.js"
import { writeServerState } from "../helpers/serverState.js"

let running = false

export function startAternosPoller() {
  if (running) return
  running = true

  setInterval(async () => {
    try {
      const status = await getStatus()
      await writeServerState(status)
      console.log("🔄 Server status updated")
    } catch {
      console.log("⚠️ Failed update server status")
    }
  }, 60_000)
}