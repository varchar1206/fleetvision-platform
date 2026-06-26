import { useMemo, useState } from "react";

import DispatchProcessNav from "../../../components/load-builder/DispatchProcessNav";
import { buildAndValidateLoads } from "../../../business/workflows/LoadWorkflow";
import {
  approveLoads,
  rejectLoads,
  submitLoadsForApproval,
} from "../../../business/workflows/ApprovalWorkflow";
import type { BusinessLoad } from "../../../business/loads/models/BusinessLoad";

export default function ApprovalQueuePage() {
  const initialLoads = useMemo(() => {
    const result = buildAndValidateLoads({
      loadDate: "2026-06-28",
      warehouseId: "warehouse-va",
      categoryIds: ["cat-ff"],
      storeIds: ["store-47", "store-54", "store-95"],
    });

    return submitLoadsForApproval(result.loads);
  }, []);

  const [loads, setLoads] = useState<BusinessLoad[]>(initialLoads);

  const pendingLoads = loads.filter((load) => load.status === "PendingApproval");

  function handleApproveAll() {
    const approvedLoads = approveLoads(pendingLoads);
    const approvedIds = new Set(approvedLoads.map((load) => load.id));

    setLoads((currentLoads) =>
      currentLoads.map((load) =>
        approvedIds.has(load.id)
          ? approvedLoads.find((approvedLoad) => approvedLoad.id === load.id) ?? load
          : load
      )
    );
  }

  function handleRejectAll() {
    const rejectedLoads = rejectLoads(pendingLoads, "Rejected during demo approval review.");
    const rejectedIds = new Set(rejectedLoads.map((load) => load.id));

    setLoads((currentLoads) =>
      currentLoads.map((load) =>
        rejectedIds.has(load.id)
          ? rejectedLoads.find((rejectedLoad) => rejectedLoad.id === load.id) ?? load
          : load
      )
    );
  }

  return (
    <section>
      <DispatchProcessNav />

      <div className="page-header">
        <div>
          <h2>Approval Queue</h2>
          <p>Review submitted loads, approve or reject them, and unlock approved loads for BOL generation.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Pending Approval</h2>
          <p>Loads Pending: {pendingLoads.length}</p>

          <button className="primary-button" type="button" onClick={handleApproveAll} disabled={pendingLoads.length === 0}>
            Approve Pending Loads
          </button>

          <button type="button" onClick={handleRejectAll} disabled={pendingLoads.length === 0}>
            Reject Pending Loads
          </button>
        </div>

        <div className="card">
          <h2>BOL Guardrail</h2>
          <p>Only approved loads may generate a Bill of Lading through DocumentService.</p>
        </div>
      </div>

      <div className="card">
        <h2>Approval Queue Loads</h2>

        <table className="data-table">
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Category</th>
              <th>Store</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loads.map((load) => (
              <tr key={load.id}>
                <td>{load.tripId}</td>
                <td>{load.categoryCode}</td>
                <td>
                  {load.storeNumber} - {load.storeName}
                </td>
                <td>{load.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
