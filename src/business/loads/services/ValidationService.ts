import type { BusinessLoad } from "../models/BusinessLoad";
import type { LoadValidationResult } from "../models/LoadValidationResult";

export function validateLoad(load: BusinessLoad): LoadValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!load.storeId) errors.push("Store is required.");
  if (!load.categoryId) errors.push("Category is required.");
  if (!load.originWarehouseId) errors.push("Warehouse is required.");
  if (!load.tripId) errors.push("Trip ID is required.");
  if (!load.commitmentTime) warnings.push("Commitment time is missing.");
  if (!load.weightLbs) warnings.push("Weight is missing.");

  return {
    loadId: load.id,
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateLoads(loads: BusinessLoad[]): LoadValidationResult[] {
  return loads.map(validateLoad);
}
