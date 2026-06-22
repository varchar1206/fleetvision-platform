import { calculateEta } from "./calculateEta";
import { compareEtaToCommitment } from "./compareEtaToCommitment";

export function buildEtaSummary(
  dispatchDate: string | null | undefined,
  dispatchTime: string | null | undefined,
  travelTime: string | null | undefined,
  commitmentTime: string | null | undefined
) {
  const estimatedArrivalTime = calculateEta(dispatchDate, dispatchTime, travelTime);
  const etaStatus = compareEtaToCommitment(
    estimatedArrivalTime,
    dispatchDate,
    commitmentTime
  );

  return {
    estimatedArrivalTime,
    etaStatus,
  };
}
