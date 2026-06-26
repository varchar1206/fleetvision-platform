import { useMemo, useState } from "react";

import { listActiveCategoryRules } from "../../business/masterdata/services/CategoryRuleService";
import { listActiveLocations } from "../../business/masterdata/services/LocationService";
import { listActiveWarehouses } from "../../business/masterdata/services/WarehouseService";
import type { LoadBuildRequest } from "../../business/loads/models/LoadBuildRequest";
import FleetActionBar from "../ui/FleetActionBar";
import FleetButton from "../ui/FleetButton";
import FleetCard from "../ui/FleetCard";

type BulkBuildPanelProps = {
  onBuild(request: LoadBuildRequest): void;
};

export default function BulkBuildPanel({ onBuild }: BulkBuildPanelProps) {
  const categories = useMemo(() => listActiveCategoryRules(), []);
  const locations = useMemo(() => listActiveLocations(), []);
  const warehouses = useMemo(() => listActiveWarehouses(), []);

  const [loadDate, setLoadDate] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const canBuild = Boolean(loadDate && warehouseId && categoryId);

  function handleBuild() {
    if (!canBuild) return;

    onBuild({
      loadDate,
      warehouseId,
      categoryIds: [categoryId],
      storeIds: locations.map((location) => location.id),
    });
  }

  return (
    <FleetCard title="Bulk Build" eyebrow="Build From Data">
      <div className="fleet-form-grid">
        <label className="fleet-field">
          <span>Load Date</span>
          <input
            type="date"
            value={loadDate}
            onChange={(event) => setLoadDate(event.target.value)}
          />
        </label>

        <label className="fleet-field">
          <span>Warehouse</span>
          <select value={warehouseId} onChange={(event) => setWarehouseId(event.target.value)}>
            <option value="">Select Warehouse</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </label>

        <label className="fleet-field">
          <span>Category</span>
          <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.code})
              </option>
            ))}
          </select>
        </label>
      </div>

      <FleetActionBar align="right">
        <FleetButton variant="secondary" disabled>
          Preview Loads
        </FleetButton>
        <FleetButton variant="primary" onClick={handleBuild} disabled={!canBuild}>
          Build Loads
        </FleetButton>
      </FleetActionBar>
    </FleetCard>
  );
}
