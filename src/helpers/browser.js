import puppeteer from "puppeteer";

let browser;
let page;

export async function getPage() {
  if (!browser) {
    if(process.env.ENVIRONTMENT !== "local") {
      browser = await puppeteer.launch({
        headless: "new",
        protocolTimeout: 120_000,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage"
        ],
      });
    } else {
      browser = await puppeteer.launch({
        headless: false,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage"
        ],
      });
    }

    page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
    );
  }

  return page;
}