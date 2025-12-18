import { loginAternos } from "../helpers/aternos.login.js";
import { startServer } from "../helpers/aternos.server.js";
import { readServerState } from "../helpers/serverState.js";
import { startAternosPoller } from "./aternos.poller.js";
import { getStatusIcon } from "../lib/utils/getStatusIcon.js";
import { mylogs } from "../lib/utils/mylogs.js";

let loggedIn = false;
let initPromise = null;

export function initAternos() {
  if (loggedIn) return initPromise;

  if (!initPromise) {
    initPromise = (async () => {
      await loginAternos();
      loggedIn = true;
      mylogs("✅", "Aternos ready");
      startAternosPoller();
    })();
  }

  return initPromise;
}

/* =======================
   START SERVER
======================= */
export async function aternosStart() {
  await initAternos();
  return await startServer();
}

/* =======================
   READ STATUS (NO PUPPETEER)
======================= */
export async function aternosStatus() {
  try {
    const data = await readServerState();

    const rawIp = data.ip || "";

    const match = rawIp.match(/([\w-]+\.aternos\.me)/);
    const cleanIp = match ? match[1].toLowerCase().trim() : "unknown";

    const icon = getStatusIcon(data.status);

    return `
      :satellite: Status: **${data.status} ${icon}**
      :busts_in_silhouette: Players: **${data.players}**
      :globe_with_meridians: IP: **${cleanIp}**
      :watch: Updated: <t:${Math.floor(data.lastUpdate / 1000)}:R>
    `;
  } catch {
    return "⚠️ No data";
  }
}
