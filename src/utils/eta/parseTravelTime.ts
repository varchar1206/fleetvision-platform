export function parseTravelTimeToMinutes(value: string | null | undefined) {
  if (!value) return 0;

  const text = value.toLowerCase().trim();

  const hourMatch = text.match(/(\d+)\s*h/);
  const minuteMatch = text.match(/(\d+)\s*m/);

  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;

  if (hours || minutes) return hours * 60 + minutes;

  const numericValue = Number(text);
  return Number.isFinite(numericValue) ? numericValue : 0;
}
