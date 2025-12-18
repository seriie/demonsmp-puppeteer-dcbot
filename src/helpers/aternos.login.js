import { getPage } from "./browser.js";
import { ENV } from "../config/env.js";
import { loadCookies, saveCookies } from "./cookies.js";
import { sleep } from "./sleep.js";
import { skipAternosAds } from "./skipAternosAds.js";
import { selectServer } from "./selectServer.js";
import { mylogs } from "../lib/utils/mylogs.js";
// import { waitPageReady } from "./waitpageReady.js";

export async function loginAternos() {
  const page = await getPage();

  await page.goto("https://aternos.org/go", {
    waitUntil: "domcontentloaded",
  });

  const usedCookie = await loadCookies(page);
  if (usedCookie) {
    await page.goto("https://aternos.org/servers", {
      waitUntil: "domcontentloaded",
    });

    try {
      await page.waitForSelector(".server-body[data-id]", { timeout: 5000 });
      mylogs("🍪", "Cookies loaded");
      mylogs("✅", "Login via cookie success");
    } catch {
      mylogs("⚠️", "Cookie invalid");
    }
  }

  if (!usedCookie) {
    mylogs("⚠️", "Cookie failed / login manually...");

    await page.goto("https://aternos.org/go/", {
      waitUntil: "domcontentloaded",
    });

    await page.waitForSelector(".go-input-group.join-right input", {
      visible: true,
    });
    await page.type(".go-input-group.join-right input", ENV.ATERNOS_USER);

    await page.waitForSelector(".go-input-group.join-both input", {
      visible: true,
    });

    await page.type(".go-input-group.join-both input", ENV.ATERNOS_PASS);

    await Promise.all([
      page.click(".login-button"),
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
    ]);

    mylogs("⌛", "Inputing manually...");

    await page.waitForFunction(() => location.href.includes("/servers"), {
      timeout: 0,
    });

    await saveCookies(page);
    mylogs("✅", "Login manual + cookie saved");
  }

  mylogs("🧠", "Selecting server...");

  await selectServer(page)

  await sleep(2000);

  // await waitPageReady(page);
  
  mylogs("🔃", "Waitiong for selector");
  
  await skipAternosAds(page);
  
  mylogs("🚀", "Server dashboard loaded");
}
