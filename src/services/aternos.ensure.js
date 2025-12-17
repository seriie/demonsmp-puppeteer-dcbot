import { initAternos } from "./aternos.service.js"

let aternosReady = false

export async function ensureAternos() {
  if (!aternosReady) {
    await initAternos()
    aternosReady = true
  }
}