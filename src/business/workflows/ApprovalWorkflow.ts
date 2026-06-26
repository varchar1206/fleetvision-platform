import {
  approveLoad,
  rejectLoad,
  submitLoadForApproval,
} from "../loads/services/ApprovalService";
import type { BusinessLoad } from "../loads/models/BusinessLoad";

export function submitLoadsForApproval(loads: BusinessLoad[]): BusinessLoad[] {
  return loads.map(submitLoadForApproval);
}

export function approveLoads(loads: BusinessLoad[]): BusinessLoad[] {
  return loads.map(approveLoad);
}

export function rejectLoads(loads: BusinessLoad[], reason: string): BusinessLoad[] {
  return loads.map((load) => rejectLoad(load, reason));
}
