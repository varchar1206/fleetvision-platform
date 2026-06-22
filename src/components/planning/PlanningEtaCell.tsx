import { buildEtaSummary } from "../../utils/eta/buildEtaSummary";

type Props = {
  dispatchDate?: string | null;
  dispatchTime?: string | null;
  travelTime?: string | null;
  commitmentTime?: string | null;
  etaStartTime?: string | null;
};

function getEtaClass(status: string) {
  if (status === "ON_TIME") return "eta-on-time";
  if (status === "AT_RISK") return "eta-at-risk";
  if (status === "LATE") return "eta-late";
  return "eta-unknown";
}

export default function PlanningEtaCell({
  dispatchDate,
  dispatchTime,
  travelTime,
  commitmentTime,
  etaStartTime,
}: Props) {
  const eta = buildEtaSummary(
    dispatchDate,
    dispatchTime,
    travelTime,
    commitmentTime,
    etaStartTime
  );

  return (
    <span className={`eta-badge ${getEtaClass(eta.etaStatus)}`}>
      {eta.estimatedArrivalTime
        ? new Date(eta.estimatedArrivalTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A"}{" "}
      - {eta.etaStatus}
    </span>
  );
}
