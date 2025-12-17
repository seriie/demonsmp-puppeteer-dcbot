import { sleep } from "./sleep.js"

export async function skipAternosAds(page, options = {}) {
  console.log("🛑 Checking blocking ads (vignette)...")

  const {
    timeout = 15000,
    closeSelector = '[aria-label="Close ad"], [aria-label="Close"]'
  } = options

  const start = Date.now()

  while (Date.now() - start < timeout) {
    const url = page.url()

    if (url.includes("google_vignette")) {
      console.log("🚫 Google vignette detected → forcing back")

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

  console.log("✨ No blocking ads")
  return false
}