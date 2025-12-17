import { sleep } from "./sleep.js"

export async function skipAternosAds(page, options = {}) {
  const {
    timeout = 10000,
    selector = '[aria-label="Close ad"], [aria-label="Close"], button[class*="close"]'
  } = options

  const start = Date.now()

  while (Date.now() - start < timeout) {
    const closeBtn = await page.$(selector)

    if (closeBtn) {
      console.log("📢 Ads detected → closing")
      await closeBtn.click()
      await sleep(500)
      return true
    }

    await sleep(300)
  }

  return false
}