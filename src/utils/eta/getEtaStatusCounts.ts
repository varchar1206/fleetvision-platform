import { buildEtaSummary } from "./buildEtaSummary";

export function getEtaStatusCounts(loads: any[]) {
  let onTime = 0;
  let atRisk = 0;
  let late = 0;

  for (const load of loads) {
    const eta = buildEtaSummary(
      load.dispatchDate,
      load.dispatchWindow,
      load.plannedTravelTime,
      load.commitmentTime,
      load.etaStartTime
    );

    if (eta.etaStatus === "ON_TIME") onTime++;
    else if (eta.etaStatus === "AT_RISK") atRisk++;
    else if (eta.etaStatus === "LATE") late++;
  }

  return {
    onTime,
    atRisk,
    late,
  };
}
