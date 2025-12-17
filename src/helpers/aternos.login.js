import { getPage } from "./browser.js";
import { ENV } from "../config/env.js";
import { loadCookies, saveCookies } from "./cookies.js";
import { sleep } from "./sleep.js";
import { skipAternosAds } from "./skipAternosAds.js";
import { selectServer } from "./selectServer.js";
// import { waitPageReady } from "./waitpageReady.js";

export async function loginAternos() {
  const page = await getPage();

  await page.goto("https://aternos.org/go", {
    waitUntil: "networkidle2",
  });

  const usedCookie = await loadCookies(page);
  if (usedCookie) {
    await page.goto("https://aternos.org/servers", {
      waitUntil: "domcontentloaded",
    });

    try {
      await page.waitForSelector(".server-body[data-id]", { timeout: 5000 });
      console.log("🍪 Cookies loaded");
      console.log("✅ Login via cookie success");
    } catch {
      console.log("⚠️ Cookie invalid");
    }
  }

  if (!usedCookie) {
    console.log("⚠️ Cookie failed / login manually...");

    await page.goto("https://aternos.org/go/", {
      waitUntil: "networkidle2",
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
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    console.log("⌛ Inputing manually...");

    await page.waitForFunction(() => location.href.includes("/servers"), {
      timeout: 0,
    });

    await saveCookies(page);
    console.log("✅ Login manual + cookie saved");
  }

  console.log("🧠 Selecting server...");

  await selectServer(page)

  await sleep(2000);

  // await waitPageReady(page);
  
  console.log("🔃 Waitiong for selector");
  
  await page.waitForSelector(".server-ip", {
    visible: true,
    timeout: 60000,
  });
  
  await skipAternosAds(page);
  console.log("🚀 Server dashboard loaded");
}
