export const PUPPETEER_CONFIG = {
  headless: false,
  slowMo: 50,
  defaultViewport: null,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--start-maximized"
  ]
}
