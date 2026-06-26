import { buildLoadsFromRequest } from "../loads/services/LoadService";
import { validateLoads } from "../loads/services/ValidationService";
import type { BusinessLoad } from "../loads/models/BusinessLoad";
import type { LoadBuildRequest } from "../loads/models/LoadBuildRequest";

export function buildAndValidateLoads(request: LoadBuildRequest): {
  loads: BusinessLoad[];
  validCount: number;
  errorCount: number;
  warningCount: number;
} {
  const loads = buildLoadsFromRequest(request);
  const validationResults = validateLoads(loads);

  const enrichedLoads = loads.map((load) => {
    const validation = validationResults.find((result) => result.loadId === load.id);

    return {
      ...load,
      status: validation?.isValid ? "ValidationComplete" : load.status,
      errors: validation?.errors ?? [],
      warnings: validation?.warnings ?? [],
      updatedAt: new Date().toISOString(),
    } satisfies BusinessLoad;
  });

  return {
    loads: enrichedLoads,
    validCount: validationResults.filter((result) => result.isValid).length,
    errorCount: validationResults.reduce((total, result) => total + result.errors.length, 0),
    warningCount: validationResults.reduce((total, result) => total + result.warnings.length, 0),
  };
}
