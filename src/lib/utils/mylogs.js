export function mylogs(icon, text) {
  const date = Date.now().toString();

  return console.log(`[${date}] ${icon}  ${text}`);
}
