import { getCategoryRuleById } from "../../masterdata/services/CategoryRuleService";
import { getLocationById } from "../../masterdata/services/LocationService";
import { getWarehouseById } from "../../masterdata/services/WarehouseService";
import type { BusinessLoad } from "../models/BusinessLoad";
import type { LoadBuildRequest } from "../models/LoadBuildRequest";

export function buildLoadsFromRequest(request: LoadBuildRequest): BusinessLoad[] {
  const warehouse = getWarehouseById(request.warehouseId);
  const now = new Date().toISOString();

  if (!warehouse) {
    return [];
  }

  return request.categoryIds.flatMap((categoryId) => {
    const category = getCategoryRuleById(categoryId);

    if (!category) {
      return [];
    }

    return request.storeIds.flatMap((storeId) => {
      const store = getLocationById(storeId);

      if (!store) {
        return [];
      }

      const id = `load-${category.code.toLowerCase()}-${store.storeNumber}-${Date.now()}`;

      return {
        id,
        tripId: `TRIP-${store.storeNumber}-${category.code}`,
        loadDate: request.loadDate,
        categoryId: category.id,
        categoryCode: category.code,
        categoryName: category.name,
        storeId: store.id,
        storeNumber: store.storeNumber,
        storeName: store.storeName,
        originWarehouseId: warehouse.id,
        originWarehouseName: warehouse.name,
        destinationName: `Store #${store.storeNumber} - ${store.storeName}`,
        destinationAddress: `${store.address}, ${store.city}, ${store.state} ${store.zip}`,
        temperature: category.temperature,
        commitmentTime: category.commitmentTime,
        status: "Built",
        notes: category.defaultBolNotes,
        errors: [],
        warnings: [],
        createdAt: now,
        updatedAt: now,
      } satisfies BusinessLoad;
    });
  });
}
