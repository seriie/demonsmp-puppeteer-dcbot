import { getPage } from "./browser.js"
import { selectServer } from "./selectServer.js"

export async function startServer() {
  const page = await getPage()

  await page.goto("https://aternos.org/server/", {
    waitUntil: "domcontentloaded"
  })

  await selectServer(page)

  await page.waitForTimeout(1000)

  const startBtn = await page.$("#start")

  if (!startBtn) {
    let status = "unknown"
    try {
      status = await page.$eval(
        ".statuslabel-label",
        el => el.innerText.trim().toLowerCase()
      )
    } catch {}

    return {
      action: "noop",
      status,
      message:
        status === "online"
          ? "🟢 Server already online"
          : status === "starting"
          ? "🟡 Server is already starting"
          : "⚠️ Start button not available",
      lastUpdate: Date.now()
    }
  }

  await startBtn.click()

  return {
    action: "starting",
    message: "🔥 Server starting...",
    lastUpdate: Date.now()
  }
}
let fetching = false

export async function getStatus() {
  if (fetching) return null
  fetching = true

  try {
    const page = await getPage()

    await page.goto("https://aternos.org/server/", {
      waitUntil: "domcontentloaded"
    })

    await page.waitForSelector(".statuslabel-label", { timeout: 60000 })

    const status = await page.$eval(
      ".statuslabel-label",
      el => el.innerText.trim().toLowerCase()
    )

    let players = "0/0"
    try {
      players = await page.$eval(
        ".statusplayerbadge",
        el => el.innerText.trim()
      )
    } catch {}

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
  } finally {
    fetching = false
  }
}