import type { Schema } from "../../../amplify/data/resource";

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

  return (
    <div className="dashboard-grid">
      <div className="card"><h2>Today's Loads</h2><p>{loads.length}</p></div>
      <div className="card"><h2>Tendered</h2><p>{tendered}</p></div>
      <div className="card"><h2>Active</h2><p>{active}</p></div>
      <div className="card"><h2>Delivered</h2><p>{delivered}</p></div>
      <div className="card"><h2>Exceptions</h2><p>{exceptions.length}</p></div>
      <div className="card"><h2>Today's Cost</h2><p>${totalCost.toFixed(2)}</p></div>
    </div>
  );
}
