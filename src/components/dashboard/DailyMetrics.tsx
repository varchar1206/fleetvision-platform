import type { Schema } from "../../../amplify/data/resource";
import { getEtaStatusCounts } from "../../utils/eta/getEtaStatusCounts";

type LoadRecord = Schema["Load"]["type"];
type ExceptionRecord = Schema["LoadException"]["type"];

type Props = {
  loads: LoadRecord[];
  exceptions: ExceptionRecord[];
};

export default function DailyMetrics({ loads, exceptions }: Props) {
  const tendered = loads.filter((load) => load.status === "TENDERED").length;
  const active = loads.filter((load) =>
    ["ACCEPTED", "ASSIGNED_TO_CARRIER", "CARRIER_ACCEPTED", "ASSIGNED_TO_DRIVER", "DISPATCHED", "IN_TRANSIT"].includes(load.status)
  ).length;
  const delivered = loads.filter((load) => load.status === "DELIVERED").length;
  const totalCost = loads.reduce((sum, load) => sum + (load.rate || 0), 0);
  const etaCounts = getEtaStatusCounts(loads);

  return (
    <div className="dashboard-grid">
      <div className="card"><h2>Today's Loads</h2><p>{loads.length}</p></div>
      <div className="card"><h2>Tendered</h2><p>{tendered}</p></div>
      <div className="card"><h2>Active</h2><p>{active}</p></div>
      <div className="card"><h2>Delivered</h2><p>{delivered}</p></div>
      <div className="card"><h2>Exceptions</h2><p>{exceptions.length}</p></div>
      <div className="card"><h2>Today's Cost</h2><p>${totalCost.toFixed(2)}</p></div>
      <div className="card"><h2>On Time ETA</h2><p>{etaCounts.onTime}</p></div>
      <div className="card"><h2>At Risk ETA</h2><p>{etaCounts.atRisk}</p></div>
      <div className="card"><h2>Late ETA</h2><p>{etaCounts.late}</p></div>
    </div>
  );
}
