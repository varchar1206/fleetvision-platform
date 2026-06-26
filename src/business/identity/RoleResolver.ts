import type { AuthenticationSession } from "../../platform/identity/AuthenticationSession";
import type { PortalOrganization } from "../../portal/models/PortalOrganization";
import type { PortalKey } from "../../portal/config/portalDefinitions";
import { portalDefinitions } from "../../portal/config/portalDefinitions";

export async function resolveRoleForSession(
  _session: AuthenticationSession,
  organization: PortalOrganization,
  portal: PortalKey
): Promise<string> {
  void _session;

  const definition = portalDefinitions[portal];

  return definition.branding.userRole || organization.type;
}
