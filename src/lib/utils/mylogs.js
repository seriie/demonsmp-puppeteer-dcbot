export function mylogs(icon, text) {
  const date = new Date(Date.now()).toDateString();

  return console.log(`[${date}] ${icon}  ${text}`);
}
