import { submitLoadsForApproval } from "../../business/workflows/ApprovalWorkflow";
import type { BusinessLoad } from "../../business/loads/models/BusinessLoad";

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
    <div className="card">
      <h2>Load Actions</h2>
      <p>Ready to Submit: {readyLoads.length}</p>

      <button
        className="primary-button"
        type="button"
        disabled={readyLoads.length === 0}
        onClick={handleSubmitForApproval}
      >
        Submit Ready Loads For Approval
      </button>

      <p>Generate BOL is intentionally unavailable in Load Builder.</p>
    </div>
  );
}
