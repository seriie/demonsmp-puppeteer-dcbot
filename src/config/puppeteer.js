import puppeteer from "puppeteer-core";

export const PUPPETEER_CONFIG = {
  headless: "new",
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage"
  ]
};