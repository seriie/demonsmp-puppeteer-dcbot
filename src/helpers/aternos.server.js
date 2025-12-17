import { getPage } from "./browser.js"
import { selectServer } from "./selectServer.js"

export async function startServer() {
  const page = await getPage()

  await page.goto("https://aternos.org/server/", {
    waitUntil: "domcontentloaded"
  })

  await selectServer(page)

  await page.waitForSelector("#start", { timeout: 0 })
  await page.click("#start")

  return {
    action: "starting",
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