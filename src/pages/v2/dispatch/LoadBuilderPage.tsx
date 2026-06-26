import { useMemo, useState } from "react";

import { buildAndValidateLoads } from "../../../business/workflows/LoadWorkflow";
import { listActiveCategoryRules } from "../../../business/masterdata/services/CategoryRuleService";
import { listActiveLocations } from "../../../business/masterdata/services/LocationService";
import { listActiveWarehouses } from "../../../business/masterdata/services/WarehouseService";
import type { BusinessLoad } from "../../../business/loads/models/BusinessLoad";

export default function LoadBuilderPage() {
  const categories = useMemo(() => listActiveCategoryRules(), []);
  const locations = useMemo(() => listActiveLocations(), []);
  const warehouses = useMemo(() => listActiveWarehouses(), []);

  const [loads, setLoads] = useState<BusinessLoad[]>([]);

  function handleBuildLoads() {
    const result = buildAndValidateLoads({
      loadDate: "2026-06-28",
      warehouseId: warehouses[0]?.id ?? "",
      categoryIds: categories.map((category) => category.id),
      storeIds: locations.map((location) => location.id),
    });

    setLoads(result.loads);
  }

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Load Builder</h2>
          <p>Build loads from master data, validate them, and submit for approval.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Build From Data</h2>
          <p>Create daily loads from warehouses, categories, and store master data.</p>
          <button className="primary-button" type="button" onClick={handleBuildLoads}>
            Build Demo Loads
          </button>
        </div>

        <div className="card">
          <h2>Reference Data Status</h2>
          <p>Locations: {locations.length}</p>
          <p>Warehouses: {warehouses.length}</p>
          <p>Categories: {categories.length}</p>
        </div>

        <div className="card">
          <h2>Build Summary</h2>
          <p>Loads Built: {loads.length}</p>
          <p>
            Ready for Approval:{" "}
            {loads.filter((load) => load.status === "ValidationComplete").length}
          </p>
        </div>
      </div>

      <div className="card">
        <h2>Built Loads</h2>

        {loads.length === 0 ? (
          <p>No loads built yet.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>Category</th>
                <th>Store</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Errors / Warnings</th>
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
                  <td>{load.originWarehouseName}</td>
                  <td>{load.destinationName}</td>
                  <td>{load.status}</td>
                  <td>
                    {load.errors.length} / {load.warnings.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
