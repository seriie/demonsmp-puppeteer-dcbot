import { loginAternos } from "../helpers/aternos.login.js"
import { startServer, getStatus } from "../helpers/aternos.server.js"

let loggedIn = false

export async function initAternos() {
  if (!loggedIn) {
    await loginAternos()
    loggedIn = true
  }
}

export async function aternosStart() {
  await initAternos()
  return await startServer()
}

export async function aternosStatus() {
  await initAternos()
  return await getStatus()
}