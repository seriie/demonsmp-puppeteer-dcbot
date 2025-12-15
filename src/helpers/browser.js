import puppeteer from "puppeteer"
import { PUPPETEER_CONFIG } from "../config/puppeteer.js"

let browser
let page

export async function getPage() {
  if (!browser) {
    browser = await puppeteer.launch({
      ...PUPPETEER_CONFIG,
      headless: false,
      defaultViewport: null,
    })

    page = await browser.newPage()
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
    )
  }
  return page
}