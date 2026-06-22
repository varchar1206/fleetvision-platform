import { buildEtaSummary } from "../../utils/eta/buildEtaSummary";

type Props = {
  dispatchDate?: string | null;
  dispatchTime?: string | null;
  travelTime?: string | null;
  commitmentTime?: string | null;
};

export default function PlanningEtaCell({
  dispatchDate,
  dispatchTime,
  travelTime,
  commitmentTime,
}: Props) {
  const eta = buildEtaSummary(
    dispatchDate,
    dispatchTime,
    travelTime,
    commitmentTime
  );

  return (
    <span>
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
