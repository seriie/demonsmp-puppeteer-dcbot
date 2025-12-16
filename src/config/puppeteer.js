import puppeteer from "puppeteer-core";

export const PUPPETEER_CONFIG = {
  executablePath: "/usr/bin/chromium-browser",
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu"
  ]
};