import { getPage } from "./browser.js"
import { selectServer } from "./selectServer.js"

export async function startServer() {
  const page = await getPage()

  await page.goto("https://aternos.org/server/", {
    waitUntil: "networkidle2"
  })

  await selectServer(page)

  await page.waitForSelector("#start", { timeout: 0 })
  await page.click("#start")

  return {
    action: "starting",
    lastUpdate: Date.now()
  }
}

export async function getStatus() {
  const page = await getPage()

  await page.goto("https://aternos.org/server/", {
    waitUntil: "networkidle2"
  })

  // 🟢 STATUS (online / offline / starting)
  const status = await page.$eval(
    ".statuslabel-label",
    el => el.innerText.trim().toLowerCase()
  )

  // 🟢 PLAYER COUNT
  let players = "0/0"
  try {
    players = await page.$eval(
      ".statusplayerbadge",
      el => el.innerText.trim()
    )
  } catch {}

  // 🟢 IP SERVER
  let ip = "-"
  try {
    ip = await page.$eval(
      ".server-ip",
      el => el.innerText.trim()
    )
  } catch {}

  return {
    status,
    players,
    ip,
    lastUpdate: Date.now()
  }
}