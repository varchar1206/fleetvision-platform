import type { Schema } from "../../../amplify/data/resource";

type LoadRecord = Schema["Load"]["type"];

type Props = {
  loads: LoadRecord[];
};

export default function ActiveMetrics({ loads }: Props) {
  const totalValue = loads.reduce((sum, load) => sum + (load.rate || 0), 0);

  return (
    <div className="dashboard-grid">
      <div className="card">
        <h2>Active Loads</h2>
        <p>{loads.length} accepted loads.</p>
      </div>

      <div className="card">
        <h2>In Transit</h2>
        <p>Tracking phase coming next.</p>
      </div>

      <div className="card">
        <h2>Exceptions</h2>
        <p>0 current exceptions.</p>
      </div>

      <div className="card">
        <h2>Active Value</h2>
        <p>${totalValue.toFixed(2)}</p>
      </div>
    </div>
  );
}
