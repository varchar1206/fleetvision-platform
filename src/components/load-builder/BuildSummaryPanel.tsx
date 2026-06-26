import type { BusinessLoad } from "../../business/loads/models/BusinessLoad";
import FleetCard from "../ui/FleetCard";

type BuildSummaryPanelProps = {
  loads: BusinessLoad[];
};

export default function BuildSummaryPanel({ loads }: BuildSummaryPanelProps) {
  const readyForApproval = loads.filter((load) => load.status === "ValidationComplete").length;
  const blocked = loads.filter((load) => load.errors.length > 0).length;
  const warnings = loads.reduce((total, load) => total + load.warnings.length, 0);

  return (
    <FleetCard eyebrow="Build Summary">
      <div className="fleet-stat-list">
        <div><span>Loads Built</span><strong>{loads.length}</strong></div>
        <div><span>Ready for Approval</span><strong>{readyForApproval}</strong></div>
        <div><span>Blocked</span><strong>{blocked}</strong></div>
        <div><span>Warnings</span><strong>{warnings}</strong></div>
      </div>
    </FleetCard>
  );
}
