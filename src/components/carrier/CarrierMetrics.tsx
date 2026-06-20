import type { Schema } from "../../../amplify/data/resource";

type LoadRecord = Schema["Load"]["type"];

type Props = {
  loads: LoadRecord[];
  selectedCount: number;
};

export default function CarrierMetrics({ loads, selectedCount }: Props) {
  const assigned = loads.filter((load) => load.status === "ACCEPTED").length;
  const accepted = loads.filter((load) => load.status === "CARRIER_ACCEPTED").length;
  const rejected = loads.filter((load) => load.status === "CARRIER_REJECTED").length;

  return (
    <div className="dashboard-grid">
      <div className="card">
        <h2>Assigned Loads</h2>
        <p>{assigned} awaiting carrier response.</p>
      </div>

      <div className="card">
        <h2>Carrier Accepted</h2>
        <p>{accepted} accepted by carrier.</p>
      </div>

      <div className="card">
        <h2>Carrier Rejected</h2>
        <p>{rejected} rejected by carrier.</p>
      </div>

      <div className="card">
        <h2>Selected</h2>
        <p>{selectedCount} selected.</p>
      </div>
    </div>
  );
}
