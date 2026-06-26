import type { AuthenticationSession } from "../../platform/identity/AuthenticationSession";
import type { PortalKey } from "../../portal/config/portalDefinitions";
import { portalDefinitions } from "../../portal/config/portalDefinitions";
import type { BusinessOrganization } from "../models/BusinessOrganization";
import type { BusinessRole } from "../models/BusinessRole";

export async function resolveRoleForSession(
  _session: AuthenticationSession,
  organization: BusinessOrganization,
  portal: PortalKey
): Promise<BusinessRole> {
  void _session;

  const definition = portalDefinitions[portal];

  return {
    key: `${portal}-role`,
    label: definition.branding.userRole || organization.type,
    organizationId: organization.id,
  };
}
