import { sleep } from "./sleep.js"
import { mylogs } from "../lib/utils/mylogs.js"

export async function skipAternosAds(page, options = {}) {
  mylogs("🛑", "Checking blocking ads (vignette)...")

  const {
    timeout = 15000,
    // closeSelector = '[aria-label="Close ad"], [aria-label="Close"]'
  } = options

  const start = Date.now()

  while (Date.now() - start < timeout) {
    const url = page.url()

    if (url.includes("google_vignette")) {
      mylogs("🚫", "Google vignette detected → forcing back")

      await page.evaluate(() => {
        history.back()
      })

      await sleep(1500)
      return true
    }

    // let closeBtn = await page.$(closeSelector)
    // if (closeBtn) {
    //   console.log("📢 Blocking ad detected (DOM) → closing")
    //   await closeBtn.click()
    //   await sleep(500)
    //   return true
    // }

    // for (const frame of page.frames()) {
    //   try {
    //     const btn = await frame.$(closeSelector)
    //     if (btn) {
    //       console.log("📢 Blocking ad detected (iframe) → closing")
    //       await btn.click()
    //       await sleep(500)
    //       return true
    //     }
    //   } catch {}
    // }

    await sleep(300)
  }

  mylogs("✨", "No blocking ads")
  return false
}