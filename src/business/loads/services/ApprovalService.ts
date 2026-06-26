import type { BusinessLoad } from "../models/BusinessLoad";

export function submitLoadForApproval(load: BusinessLoad): BusinessLoad {
  if (load.errors.length > 0) {
    throw new Error("Load cannot be submitted for approval while validation errors exist.");
  }

  return {
    ...load,
    status: "PendingApproval",
    updatedAt: new Date().toISOString(),
  };
}

export function approveLoad(load: BusinessLoad): BusinessLoad {
  if (load.status !== "PendingApproval") {
    throw new Error("Only pending approval loads can be approved.");
  }

  return {
    ...load,
    status: "Approved",
    updatedAt: new Date().toISOString(),
  };
}

export function rejectLoad(load: BusinessLoad, reason: string): BusinessLoad {
  if (load.status !== "PendingApproval") {
    throw new Error("Only pending approval loads can be rejected.");
  }

  return {
    ...load,
    status: "Rejected",
    notes: [load.notes, `Rejected: ${reason}`].filter(Boolean).join("\n"),
    updatedAt: new Date().toISOString(),
  };
}
