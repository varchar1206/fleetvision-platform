import type { BusinessLoad } from "../../business/loads/models/BusinessLoad";

type BuildSummaryPanelProps = {
  loads: BusinessLoad[];
};

export default function BuildSummaryPanel({ loads }: BuildSummaryPanelProps) {
  const readyForApproval = loads.filter((load) => load.status === "ValidationComplete").length;
  const blocked = loads.filter((load) => load.errors.length > 0).length;
  const warnings = loads.reduce((total, load) => total + load.warnings.length, 0);

  return (
    <div className="card">
      <h2>Build Summary</h2>
      <p>Loads Built: {loads.length}</p>
      <p>Ready for Approval: {readyForApproval}</p>
      <p>Blocked: {blocked}</p>
      <p>Warnings: {warnings}</p>
    </div>
  );
}
