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
  const [selectedStoreIds, setSelectedStoreIds] = useState<string[]>([]);

  const canBuild = Boolean(loadDate && warehouseId && categoryId && selectedStoreIds.length > 0);

  function toggleStore(storeId: string) {
    setSelectedStoreIds((current) =>
      current.includes(storeId)
        ? current.filter((id) => id !== storeId)
        : [...current, storeId]
    );
  }

  function selectAllStores() {
    setSelectedStoreIds(locations.map((location) => location.id));
  }

  function clearStores() {
    setSelectedStoreIds([]);
  }

  function handleBuild() {
    if (!canBuild) return;

    onBuild({
      loadDate,
      warehouseId,
      categoryIds: [categoryId],
      storeIds: selectedStoreIds,
    });
  }

  return (
    <FleetCard title="Bulk Build" eyebrow="Build From Master Data">
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

      <div className="fleet-panel-section">
        <div className="fleet-section-header">
          <div>
            <h3>Stores</h3>
            <p>Select the destination stores to include in this build.</p>
          </div>

          <FleetActionBar align="right">
            <FleetButton variant="secondary" onClick={selectAllStores}>
              Select All
            </FleetButton>
            <FleetButton variant="ghost" onClick={clearStores}>
              Clear
            </FleetButton>
          </FleetActionBar>
        </div>

        <div className="fleet-checkbox-grid">
          {locations.map((location) => (
            <label className="fleet-checkbox-card" key={location.id}>
              <input
                type="checkbox"
                checked={selectedStoreIds.includes(location.id)}
                onChange={() => toggleStore(location.id)}
              />
              <span>
                Store #{location.storeNumber} - {location.storeName}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="fleet-build-preview">
        <span>Preview Loads</span>
        <strong>{canBuild ? selectedStoreIds.length : 0}</strong>
      </div>

      <FleetActionBar align="right">
        <FleetButton variant="primary" onClick={handleBuild} disabled={!canBuild}>
          Build Selected Loads
        </FleetButton>
      </FleetActionBar>
    </FleetCard>
  );
}
