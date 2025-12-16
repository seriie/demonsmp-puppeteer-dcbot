import puppeteer from "puppeteer";

export const PUPPETEER_CONFIG = {
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu"
  ]
};