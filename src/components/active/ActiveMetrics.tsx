import type { Schema } from "../../../amplify/data/resource";
import { getEtaStatusCounts } from "../../utils/eta/getEtaStatusCounts";

type LoadRecord = Schema["Load"]["type"];

type Props = {
  loads: LoadRecord[];
};

export default function ActiveMetrics({ loads }: Props) {
  const totalValue = loads.reduce((sum, load) => sum + (load.rate || 0), 0);
  const etaCounts = getEtaStatusCounts(loads);

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

      <div className="card">
        <h2>On Time ETA</h2>
        <p>{etaCounts.onTime}</p>
      </div>

      <div className="card">
        <h2>At Risk ETA</h2>
        <p>{etaCounts.atRisk}</p>
      </div>

      <div className="card">
        <h2>Late ETA</h2>
        <p>{etaCounts.late}</p>
      </div>
    </div>
  );
}
