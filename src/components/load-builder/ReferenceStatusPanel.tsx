import { listActiveCategoryRules } from "../../business/masterdata/services/CategoryRuleService";
import { listActiveLocations } from "../../business/masterdata/services/LocationService";
import { listActiveWarehouses } from "../../business/masterdata/services/WarehouseService";

export default function ReferenceStatusPanel() {
  const locations = listActiveLocations();
  const warehouses = listActiveWarehouses();
  const categories = listActiveCategoryRules();

  return (
    <div className="card">
      <h2>Reference Status</h2>
      <p>Master data readiness for load building.</p>

      <ul>
        <li>Locations Loaded: {locations.length}</li>
        <li>Warehouses Loaded: {warehouses.length}</li>
        <li>Categories Loaded: {categories.length}</li>
      </ul>
    </div>
  );
}
