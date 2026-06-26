import { submitLoadsForApproval } from "../../business/workflows/ApprovalWorkflow";
import type { BusinessLoad } from "../../business/loads/models/BusinessLoad";
import FleetActionBar from "../ui/FleetActionBar";
import FleetButton from "../ui/FleetButton";
import FleetCard from "../ui/FleetCard";

type LoadBuilderActionsProps = {
  loads: BusinessLoad[];
  onLoadsUpdated(loads: BusinessLoad[]): void;
};

export default function LoadBuilderActions({
  loads,
  onLoadsUpdated,
}: LoadBuilderActionsProps) {
  const readyLoads = loads.filter((load) => load.status === "ValidationComplete");

  function handleSubmitForApproval() {
    const submittedLoads = submitLoadsForApproval(readyLoads);
    const submittedIds = new Set(submittedLoads.map((load) => load.id));

    onLoadsUpdated(
      loads.map((load) =>
        submittedIds.has(load.id)
          ? submittedLoads.find((submittedLoad) => submittedLoad.id === load.id) ?? load
          : load
      )
    );
  }

  return (
    <FleetCard title="Load Actions" eyebrow="Approval Handoff">
      <p>Ready to Submit: {readyLoads.length}</p>
      <p>Generate BOL is intentionally unavailable in Load Builder.</p>

      <FleetActionBar align="right">
        <FleetButton
          variant="primary"
          disabled={readyLoads.length === 0}
          onClick={handleSubmitForApproval}
        >
          Submit Ready Loads For Approval
        </FleetButton>
      </FleetActionBar>
    </FleetCard>
  );
}
