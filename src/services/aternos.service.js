import { loginAternos } from "../helpers/aternos.login.js"
import { startServer, getStatus } from "../helpers/aternos.server.js"

let loggedIn = false
let initPromise = null

export function initAternos() {
  if (loggedIn) return

  if (!initPromise) {
    initPromise = (async () => {
      await loginAternos()
      loggedIn = true
      console.log("✅ Aternos ready")
    })()
  }

  return initPromise
}

export async function aternosStart() {
  return await startServer()
}

export async function aternosStatus() {
  return await getStatus()
}