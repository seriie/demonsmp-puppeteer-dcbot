export function mylogs(icon, text) {
  const date = Date.now().toString();

  return `[${date}] ${icon}  ${text}`;
}
