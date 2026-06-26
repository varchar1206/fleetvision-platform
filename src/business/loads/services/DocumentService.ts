import type { BusinessLoad } from "../models/BusinessLoad";

export function canGenerateBol(load: BusinessLoad): boolean {
  return load.status === "Approved";
}

export function generateBolForLoad(load: BusinessLoad): BusinessLoad {
  if (!canGenerateBol(load)) {
    throw new Error("BOL generation is only allowed for approved loads.");
  }

  return {
    ...load,
    status: "BolGenerated",
    updatedAt: new Date().toISOString(),
  };
}
