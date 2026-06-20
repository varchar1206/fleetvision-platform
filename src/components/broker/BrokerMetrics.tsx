import type { Schema } from "../../../amplify/data/resource";

type LoadRecord = Schema["Load"]["type"];

type Props = {
  loads: LoadRecord[];
  selectedCount: number;
};

export default function BrokerMetrics({ loads, selectedCount }: Props) {
  const tendered = loads.filter((load) => load.status === "TENDERED").length;
  const accepted = loads.filter((load) => load.status === "ACCEPTED").length;
  const rejected = loads.filter((load) => load.status === "REJECTED").length;

  return (
    <div className="dashboard-grid">
      <div className="card">
        <h2>Tendered</h2>
        <p>{tendered} awaiting response.</p>
      </div>

      <div className="card">
        <h2>Accepted</h2>
        <p>{accepted} accepted loads.</p>
      </div>

      <div className="card">
        <h2>Rejected</h2>
        <p>{rejected} rejected loads.</p>
      </div>

      <div className="card">
        <h2>Selected</h2>
        <p>{selectedCount} selected.</p>
      </div>
    </div>
  );
}
