import { getPage } from "./browser.js"

export async function startServer() {
  const page = await getPage()

  await page.goto("https://aternos.org/server/", {
    waitUntil: "networkidle2"
  })

  await page.waitForSelector("#start", { timeout: 0 })
  await page.click("#start")

  return "🔥 Server starting..."
}

export async function getStatus() {
  const page = await getPage()

  await page.goto("https://aternos.org/server/", {
    waitUntil: "networkidle2"
  })

  const status = await page.$eval("#status", el => el.innerText)
  return `📡 Status: ${status}`
}