import { useMemo, useState } from "react";

import { listActiveCategoryRules } from "../../business/masterdata/services/CategoryRuleService";
import { listActiveLocations } from "../../business/masterdata/services/LocationService";
import { listActiveWarehouses } from "../../business/masterdata/services/WarehouseService";
import type { LoadBuildRequest } from "../../business/loads/models/LoadBuildRequest";

type BulkBuildPanelProps = {
  onBuild(request: LoadBuildRequest): void;
};

export default function BulkBuildPanel({
  onBuild,
}: BulkBuildPanelProps) {
  const categories = useMemo(() => listActiveCategoryRules(), []);
  const locations = useMemo(() => listActiveLocations(), []);
  const warehouses = useMemo(() => listActiveWarehouses(), []);

  const [loadDate, setLoadDate] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  function handleBuild() {
    if (!warehouseId || !categoryId || !loadDate) {
      return;
    }

    onBuild({
      loadDate,
      warehouseId,
      categoryIds: [categoryId],
      storeIds: locations.map((location) => location.id),
    });
  }

  return (
    <div className="card">
      <h2>Bulk Build</h2>

      <label>
        Load Date
        <input
          type="date"
          value={loadDate}
          onChange={(e) => setLoadDate(e.target.value)}
        />
      </label>

      <label>
        Warehouse
        <select
          value={warehouseId}
          onChange={(e) => setWarehouseId(e.target.value)}
        >
          <option value="">Select Warehouse</option>

          {warehouses.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Category
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name} ({category.code})
            </option>
          ))}
        </select>
      </label>

      <button
        className="primary-button"
        type="button"
        onClick={handleBuild}
      >
        Build Loads
      </button>
    </div>
  );
}
