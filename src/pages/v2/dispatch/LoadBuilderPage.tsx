import { useState } from "react";

import BuildSummaryPanel from "../../../components/load-builder/BuildSummaryPanel";
import BulkBuildPanel from "../../../components/load-builder/BulkBuildPanel";
import BuiltLoadsTable from "../../../components/load-builder/BuiltLoadsTable";
import DispatchProcessNav from "../../../components/load-builder/DispatchProcessNav";
import LoadBuilderActions from "../../../components/load-builder/LoadBuilderActions";
import ReferenceStatusPanel from "../../../components/load-builder/ReferenceStatusPanel";
import { buildAndValidateLoads } from "../../../business/workflows/LoadWorkflow";
import type { BusinessLoad } from "../../../business/loads/models/BusinessLoad";
import type { LoadBuildRequest } from "../../../business/loads/models/LoadBuildRequest";

export default function LoadBuilderPage() {
  const [loads, setLoads] = useState<BusinessLoad[]>([]);

  function handleBuildLoads(request: LoadBuildRequest) {
    const result = buildAndValidateLoads(request);
    setLoads(result.loads);
  }

  return (
    <section>
      <DispatchProcessNav />

      <div className="page-header">
        <div>
          <h2>Load Builder</h2>
          <p>Build loads from master data, validate them, and submit them for approval.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <BulkBuildPanel onBuild={handleBuildLoads} />
        <ReferenceStatusPanel />
        <BuildSummaryPanel loads={loads} />
        <LoadBuilderActions loads={loads} onLoadsUpdated={setLoads} />
      </div>

      <BuiltLoadsTable loads={loads} />
    </section>
  );
}
