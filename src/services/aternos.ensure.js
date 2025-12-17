import { initAternos } from "./aternos.service"

let aternosReady = false

export async function ensureAternos() {
  if (!aternosReady) {
    await initAternos()
    aternosReady = true
  }
}