import type { AuthenticationSession } from "../../platform/identity/AuthenticationSession";
import type { BusinessOrganization } from "../models/BusinessOrganization";
import type { BusinessPortalContext } from "../models/BusinessPortalContext";

export async function resolveOrganizationForSession(
  _session: AuthenticationSession,
  context: BusinessPortalContext
): Promise<BusinessOrganization> {
  void _session;

  return {
    id: `demo-${context.portalKey}-organization`,
    name: context.companyName,
    type: context.organizationType,
    status: "ACTIVE",
  };
}
