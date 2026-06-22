export function getDefaultEtaStart(
  dispatchDate: string | null | undefined,
  dispatchTime: string | null | undefined
) {
  if (!dispatchDate || !dispatchTime) return null;

  const start = new Date(`${dispatchDate}T${dispatchTime}:00`);

  start.setMinutes(start.getMinutes() + 30);

  return {
    etaStartTime: start.toISOString(),
    etaStartSource: "DEFAULT_30_MINUTES",
  };
}
