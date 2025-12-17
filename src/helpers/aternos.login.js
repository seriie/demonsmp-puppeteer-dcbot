import { getPage } from "./browser.js";
import { ENV } from "../config/env.js";
import { loadCookies, saveCookies } from "./cookies.js";
import { sleep } from "./sleep.js";
import { skipAternosAds } from "./skipAternosAds.js";

export async function loginAternos() {
  const page = await getPage();

  await page.goto("https://aternos.org/servers/", {
    waitUntil: "domcontentloaded",
  });

  await skipAternosAds(page)

  const usedCookie = await loadCookies(page);
  if (usedCookie) {
    await page.reload({ waitUntil: "networkidle2" });

    if (page.url().includes("/servers")) {
      console.log("🍪 Cookies loaded");
      console.log("✅ Login via cookie success");
    }
  }

  if (!page.url().includes("/servers")) {
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

  await page.waitForSelector(".server-body[data-id]", {
    visible: true,
    timeout: 0,
  });

  const serverId = await page.$eval(
    ".server-body[data-id]",
    (el) => el.dataset.id
  );

  console.log("🎮 Server ID:", serverId);

  const serverEl = await page.$(`.server-body[data-id="${serverId}"]`);
  await serverEl.click();

  console.log("🖱️ Server clicked, checking ads...");

  await sleep(2000)

  const adCloseSelector = ".ad-container .close, .adsbygoogle + button";

  const adCloseBtn = await page.$(adCloseSelector);

  if (adCloseBtn) {
    console.log("📢 Ads detected, closing...");
    await adCloseBtn.click();
    await sleep(1000)
  } else {
    console.log("✨ No ads, let's go");
  }

  await page.waitForSelector(".server-ip", {
    visible: true,
    timeout: 60000,
  });

  console.log("🚀 Server dashboard loaded");
}
