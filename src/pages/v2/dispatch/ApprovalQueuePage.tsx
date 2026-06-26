import { useMemo, useState } from "react";

import DispatchProcessNav from "../../../components/load-builder/DispatchProcessNav";
import BuiltLoadsTable from "../../../components/load-builder/BuiltLoadsTable";
import {
  approveLoads,
  rejectLoads,
  submitLoadsForApproval,
} from "../../../business/workflows/ApprovalWorkflow";
import { buildAndValidateLoads } from "../../../business/workflows/LoadWorkflow";
import type { BusinessLoad } from "../../../business/loads/models/BusinessLoad";
import { generateBolForLoad } from "../../../business/loads/services/DocumentService";
import FleetActionBar from "../../../components/ui/FleetActionBar";
import FleetButton from "../../../components/ui/FleetButton";
import FleetCard from "../../../components/ui/FleetCard";
import FleetGrid from "../../../design-system/layout/FleetGrid";
import FleetPage from "../../../design-system/layout/FleetPage";

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
  const approvedLoads = loads.filter((load) => load.status === "Approved");

  function updateChangedLoads(changedLoads: BusinessLoad[]) {
    const changedIds = new Set(changedLoads.map((load) => load.id));

    setLoads((currentLoads) =>
      currentLoads.map((load) =>
        changedIds.has(load.id)
          ? changedLoads.find((changedLoad) => changedLoad.id === load.id) ?? load
          : load
      )
    );
  }

  function handleApproveAll() {
    updateChangedLoads(approveLoads(pendingLoads));
  }

  function handleRejectAll() {
    updateChangedLoads(rejectLoads(pendingLoads, "Rejected during demo approval review."));
  }

  function handleGenerateBolForApproved() {
    updateChangedLoads(approvedLoads.map(generateBolForLoad));
  }

  return (
    <FleetPage
      title="Approval Queue"
      description="Review submitted loads, approve or reject them, and unlock approved loads for BOL generation."
    >
      <DispatchProcessNav />

      <FleetGrid columns={2}>
        <FleetCard title="Pending Approval" eyebrow="Approval Review">
          <div className="fleet-stat-list">
            <div><span>Pending Loads</span><strong>{pendingLoads.length}</strong></div>
            <div><span>Approved Loads</span><strong>{approvedLoads.length}</strong></div>
          </div>

          <FleetActionBar align="right">
            <FleetButton
              variant="primary"
              onClick={handleApproveAll}
              disabled={pendingLoads.length === 0}
            >
              Approve Pending Loads
            </FleetButton>

            <FleetButton
              variant="danger"
              onClick={handleRejectAll}
              disabled={pendingLoads.length === 0}
            >
              Reject Pending Loads
            </FleetButton>
          </FleetActionBar>
        </FleetCard>

        <FleetCard title="BOL Guardrail" eyebrow="Document Service">
          <p>Only approved loads may generate a Bill of Lading through DocumentService.</p>

          <FleetActionBar align="right">
            <FleetButton
              variant="secondary"
              onClick={handleGenerateBolForApproved}
              disabled={approvedLoads.length === 0}
            >
              Generate BOL For Approved Loads
            </FleetButton>
          </FleetActionBar>
        </FleetCard>
      </FleetGrid>

      <BuiltLoadsTable loads={loads} />
    </FleetPage>
  );
}
