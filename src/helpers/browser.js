import puppeteer from "puppeteer";

let browser;
let page;

export async function getPage() {
  console.log("Chrome path:", puppeteer.executablePath());
  if (!browser) {
    if(process.env.ENVIRONTMENT !== "local") {
      browser = await puppeteer.launch({
        executalePath: "/home/container/.cache/puppeteer",
        headless: "new",
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