export function mylogs(icon, text) {
  const pad = (n) => String(n).padStart(2, "0");
  const now = new Date();

  const datetime =
    `${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${now.getFullYear()} ` +
    `${pad(now.getHours())}.${pad(now.getMinutes())}.${pad(now.getSeconds())}`;

  return console.log(`[${datetime}] ${icon}  ${text}`);
}
