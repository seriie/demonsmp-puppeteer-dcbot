export function getStatusIcon(status = "") {
  const s = status.toLowerCase();

  if (s === "online") return "🟢";
  if (s.includes("starting")) return "🔄";
  if (s.includes("loading")) return "🔄";
  if (s.includes("saving")) return "📥";
  if (s.includes("queue")) return ":hourglass:";

  return "🔴";
}
