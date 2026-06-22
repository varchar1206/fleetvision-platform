import { parseTravelTimeToMinutes } from "./parseTravelTime";

export function calculateEta(
  dispatchDate: string | null | undefined,
  dispatchTime: string | null | undefined,
  travelTime: string | null | undefined,
  etaStartTime?: string | null
) {
  const travelMinutes = parseTravelTimeToMinutes(travelTime);

  const start = etaStartTime
    ? new Date(etaStartTime)
    : dispatchDate && dispatchTime
      ? new Date(`${dispatchDate}T${dispatchTime}:00`)
      : null;

  if (!start || Number.isNaN(start.getTime())) return "";

  start.setMinutes(start.getMinutes() + travelMinutes);

  return start.toISOString();
}
