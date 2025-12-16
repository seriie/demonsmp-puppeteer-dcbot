import puppeteer from "puppeteer-core";
import { PUPPETEER_CONFIG } from "../config/puppeteer.js";
import fs from "fs";

console.log("Puppeteer executable:", puppeteer.executablePath());

console.log("chromium:", fs.existsSync("/usr/bin/chromium"));
console.log("chromium-browser:", fs.existsSync("/usr/bin/chromium-browser"));
console.log("lib chromium:", fs.existsSync("/usr/lib/chromium/chromium"));

let browser;
let page;

export async function getPage() {
  if (!browser) {
    browser = await puppeteer.launch({...PUPPETEER_CONFIG});
    page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
    );
  }
  return page;
}
