export function formatEasternDateTime(value?: string | null) {
  if (!value) return "N/A";

  return new Date(value).toLocaleString("en-US", {
    timeZone: "America/New_York",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });
}
