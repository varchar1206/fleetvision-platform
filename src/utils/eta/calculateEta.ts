import { parseTravelTimeToMinutes } from "./parseTravelTime";

export function calculateEta(
  dispatchDate: string | null | undefined,
  dispatchTime: string | null | undefined,
  travelTime: string | null | undefined
) {
  if (!dispatchDate || !dispatchTime) return "";

  const travelMinutes = parseTravelTimeToMinutes(travelTime);
  const eta = new Date(`${dispatchDate}T${dispatchTime}:00`);

  eta.setMinutes(eta.getMinutes() + travelMinutes);

  return eta.toISOString();
}
