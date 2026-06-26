import { listActiveCategoryRules } from "../../business/masterdata/services/CategoryRuleService";
import { listActiveLocations } from "../../business/masterdata/services/LocationService";
import { listActiveWarehouses } from "../../business/masterdata/services/WarehouseService";
import FleetCard from "../ui/FleetCard";

export default function ReferenceStatusPanel() {
  const locations = listActiveLocations();
  const warehouses = listActiveWarehouses();
  const categories = listActiveCategoryRules();

  return (
    <FleetCard eyebrow="Reference Data Status">
      <div className="fleet-stat-list">
        <div><span>Locations</span><strong>{locations.length}</strong></div>
        <div><span>Warehouses</span><strong>{warehouses.length}</strong></div>
        <div><span>Categories</span><strong>{categories.length}</strong></div>
      </div>
    </FleetCard>
  );
}
