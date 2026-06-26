import { useMemo } from "react";

import { listActiveCategoryRules } from "../../business/masterdata/services/CategoryRuleService";
import { listActiveLocations } from "../../business/masterdata/services/LocationService";
import { listActiveWarehouses } from "../../business/masterdata/services/WarehouseService";

export default function CreateLoadPage() {
  const categories = useMemo(() => listActiveCategoryRules(), []);
  const locations = useMemo(() => listActiveLocations(), []);
  const warehouses = useMemo(() => listActiveWarehouses(), []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Create Load</h2>
          <p>Submit a new customer load request for dispatch review.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Load Request</h2>
          <p>This customer-facing page will collect shipment details and submit the request to dispatch.</p>

          <label>
            Load Date
            <input type="date" />
          </label>

          <label>
            Category
            <select>
              {categories.map((category) => (
                <option key={category.id}>{category.name} ({category.code})</option>
              ))}
            </select>
          </label>

          <label>
            Origin Warehouse
            <select>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id}>{warehouse.name}</option>
              ))}
            </select>
          </label>

          <label>
            Destination Store
            <select>
              {locations.map((location) => (
                <option key={location.id}>
                  Store #{location.storeNumber} - {location.storeName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="card">
          <h2>Request Status</h2>
          <p>New load requests will be reviewed by dispatch before becoming operational loads.</p>
          <p>Status: Draft</p>
        </div>
      </div>
    </section>
  );
}
