import DispatchProcessNav from "../../../components/load-builder/DispatchProcessNav";
import FleetCard from "../../../components/ui/FleetCard";
import FleetButton from "../../../components/ui/FleetButton";
import FleetActionBar from "../../../components/ui/FleetActionBar";
import FleetGrid from "../../../design-system/layout/FleetGrid";
import FleetPage from "../../../design-system/layout/FleetPage";

export default function LoadUploadPage() {
  return (
    <FleetPage
      title="Upload Load File"
      description="Upload daily load spreadsheets, map columns, validate records, and build load records."
    >
      <DispatchProcessNav />

      <FleetGrid columns={2}>
        <FleetCard title="Spreadsheet Upload" eyebrow="Upload Loads">
          <p>This workflow will import daily load files and convert them into draft operational loads.</p>

          <label className="fleet-field">
            <span>Load Spreadsheet</span>
            <input type="file" accept=".csv,.xlsx,.xls" />
          </label>

          <FleetActionBar align="right">
            <FleetButton variant="secondary" disabled>
              Map Columns
            </FleetButton>
            <FleetButton variant="primary" disabled>
              Validate File
            </FleetButton>
          </FleetActionBar>
        </FleetCard>

        <FleetCard title="Upload Status" eyebrow="Import Readiness">
          <div className="fleet-stat-list">
            <div><span>File Selected</span><strong>No</strong></div>
            <div><span>Rows Parsed</span><strong>0</strong></div>
            <div><span>Errors</span><strong>0</strong></div>
            <div><span>Ready to Build</span><strong>0</strong></div>
          </div>
        </FleetCard>
      </FleetGrid>
    </FleetPage>
  );
}
