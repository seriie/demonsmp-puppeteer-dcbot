import fs from "fs";
import { mylogs } from "../lib/utils/mylogs";

const COOKIE_PATH = "./cookies.json";

export function hasCookies() {
  return fs.existsSync(COOKIE_PATH);
}

export async function loadCookies(page) {
  if (!hasCookies()) return false;

  const cookies = JSON.parse(fs.readFileSync("./cookies.json", "utf-8"));
  await page.setCookie(...cookies);

  mylogs("🍪", "Cookies loaded");
  return true;
}

export async function saveCookies(page) {
  const cookies = await page.cookies();
  fs.writeFileSync(COOKIE_PATH, JSON.stringify(cookies, null, 2));
  mylogs("🍪", "Cookies saved");
}
