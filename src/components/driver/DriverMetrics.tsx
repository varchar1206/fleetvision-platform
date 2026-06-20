import type { Schema } from "../../../amplify/data/resource";

type LoadRecord = Schema["Load"]["type"];

type Props = {
  loads: LoadRecord[];
};

export default function DriverMetrics({ loads }: Props) {
  const assigned = loads.filter((load) => load.status === "ASSIGNED_TO_DRIVER").length;
  const dispatched = loads.filter((load) => load.status === "DISPATCHED").length;
  const inTransit = loads.filter((load) => load.status === "IN_TRANSIT").length;
  const delivered = loads.filter((load) => load.status === "DELIVERED").length;

  return (
    <div className="dashboard-grid">
      <div className="card"><h2>Assigned</h2><p>{assigned} loads.</p></div>
      <div className="card"><h2>Dispatched</h2><p>{dispatched} loads.</p></div>
      <div className="card"><h2>In Transit</h2><p>{inTransit} loads.</p></div>
      <div className="card"><h2>Delivered</h2><p>{delivered} loads.</p></div>
    </div>
  );
}
