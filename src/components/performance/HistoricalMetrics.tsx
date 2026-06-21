import type { Schema } from "../../../amplify/data/resource";

type LoadRecord = Schema["Load"]["type"];
type ExceptionRecord = Schema["LoadException"]["type"];

type Props = {
  loads: LoadRecord[];
  exceptions: ExceptionRecord[];
};

export default function HistoricalMetrics({ loads, exceptions }: Props) {
  const delivered = loads.filter((load) => load.status === "DELIVERED").length;
  const rejected = loads.filter((load) =>
    ["REJECTED", "CARRIER_REJECTED"].includes(load.status)
  ).length;
  const totalCost = loads.reduce((sum, load) => sum + (load.rate || 0), 0);

  return (
    <div className="dashboard-grid">
      <div className="card"><h2>Total Loads</h2><p>{loads.length}</p></div>
      <div className="card"><h2>Delivered</h2><p>{delivered}</p></div>
      <div className="card"><h2>Rejected</h2><p>{rejected}</p></div>
      <div className="card"><h2>Exceptions</h2><p>{exceptions.length}</p></div>
      <div className="card"><h2>Total Cost</h2><p>${totalCost.toFixed(2)}</p></div>
      <div className="card"><h2>Avg Cost</h2><p>${loads.length ? (totalCost / loads.length).toFixed(2) : "0.00"}</p></div>
    </div>
  );
}
