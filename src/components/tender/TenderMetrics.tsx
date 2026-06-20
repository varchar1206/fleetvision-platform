import type { Schema } from "../../../amplify/data/resource";

type LoadRecord = Schema["Load"]["type"];

type Props = {
  loads: LoadRecord[];
  selectedCount: number;
};

export default function TenderMetrics({ loads, selectedCount }: Props) {
  const readyCount = loads.filter((load) => load.status === "READY_TO_TENDER").length;
  const tenderedCount = loads.filter((load) => load.status === "TENDERED").length;
  const totalValue = loads.reduce((sum, load) => sum + (load.rate || 0), 0);

  return (
    <div className="dashboard-grid">
      <div className="card">
        <h2>Ready To Tender</h2>
        <p>{readyCount} loads ready.</p>
      </div>

      <div className="card">
        <h2>Tendered</h2>
        <p>{tenderedCount} loads tendered.</p>
      </div>

      <div className="card">
        <h2>Selected Loads</h2>
        <p>{selectedCount} selected.</p>
      </div>

      <div className="card">
        <h2>Total Tender Value</h2>
        <p>${totalValue.toFixed(2)}</p>
      </div>
    </div>
  );
}
