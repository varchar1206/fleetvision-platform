export function getEtaStartUpdate(status: string, timestamp: string) {
  if (status !== "IN_ROUTE_TO_DELIVERY") return {};

  return {
    etaStartTime: timestamp,
    etaStartSource: "DRIVER_CHECK_IN",
  };
}
