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
  const [showPreview, setShowPreview] = useState(false);

  const selectedWarehouse = warehouses.find((warehouse) => warehouse.id === warehouseId);
  const selectedCategory = categories.find((category) => category.id === categoryId);
  const selectedStores = locations.filter((location) => selectedStoreIds.includes(location.id));

  const canPreview = Boolean(loadDate && warehouseId && categoryId && selectedStoreIds.length > 0);

  function toggleStore(storeId: string) {
    setSelectedStoreIds((current) =>
      current.includes(storeId)
        ? current.filter((id) => id !== storeId)
        : [...current, storeId]
    );
    setShowPreview(false);
  }

  function selectAllStores() {
    setSelectedStoreIds(locations.map((location) => location.id));
    setShowPreview(false);
  }

  function clearStores() {
    setSelectedStoreIds([]);
    setShowPreview(false);
  }

  function handleBuild() {
    if (!canPreview) return;

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
            onChange={(event) => {
              setLoadDate(event.target.value);
              setShowPreview(false);
            }}
          />
        </label>

        <label className="fleet-field">
          <span>Warehouse</span>
          <select
            value={warehouseId}
            onChange={(event) => {
              setWarehouseId(event.target.value);
              setShowPreview(false);
            }}
          >
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
          <select
            value={categoryId}
            onChange={(event) => {
              setCategoryId(event.target.value);
              setShowPreview(false);
            }}
          >
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
        <strong>{canPreview ? selectedStoreIds.length : 0}</strong>
      </div>

      {showPreview && (
        <div className="fleet-preview-list">
          <h3>Loads Ready to Build</h3>
          {selectedStores.map((store) => (
            <div className="fleet-preview-row" key={store.id}>
              <span>Store #{store.storeNumber} - {store.storeName}</span>
              <small>
                {selectedCategory?.code} • {selectedWarehouse?.name} • {loadDate}
              </small>
            </div>
          ))}
        </div>
      )}

      <FleetActionBar align="right">
        <FleetButton
          variant="secondary"
          onClick={() => setShowPreview(true)}
          disabled={!canPreview}
        >
          Preview Loads
        </FleetButton>

        <FleetButton variant="primary" onClick={handleBuild} disabled={!canPreview}>
          Build Selected Loads
        </FleetButton>
      </FleetActionBar>
    </FleetCard>
  );
}
