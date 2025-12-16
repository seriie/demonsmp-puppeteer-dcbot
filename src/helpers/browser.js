import puppeteer from "puppeteer";

let browser;
let page;

export async function getPage() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: "new",
      executablePath: puppeteer.executablePath(), // 🔥 INI PENTING
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage"
      ],
    });

    page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
    );
  }

  return page;
}