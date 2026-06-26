import type { AuthenticationSession } from "../../platform/identity/AuthenticationSession";
import type { BusinessOrganization } from "../models/BusinessOrganization";
import type { BusinessPortalContext } from "../models/BusinessPortalContext";
import type { BusinessRole } from "../models/BusinessRole";

export async function resolveRoleForSession(
  _session: AuthenticationSession,
  organization: BusinessOrganization,
  context: BusinessPortalContext
): Promise<BusinessRole> {
  void _session;

  return {
    key: `${context.portalKey}-role`,
    label: context.userRole || organization.type,
    organizationId: organization.id,
  };
}
