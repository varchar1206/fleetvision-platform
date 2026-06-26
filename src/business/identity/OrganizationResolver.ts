import type { AuthenticationSession } from "../../platform/identity/AuthenticationSession";
import type { PortalOrganization } from "../../portal/models/PortalOrganization";
import type { PortalKey } from "../../portal/config/portalDefinitions";
import { portalDefinitions } from "../../portal/config/portalDefinitions";

export async function resolveOrganizationForSession(
  _session: AuthenticationSession,
  portal: PortalKey
): Promise<PortalOrganization> {
  void _session;

  const definition = portalDefinitions[portal];

  return {
    id: `demo-${portal}-organization`,
    name: definition.branding.companyName,
    type: definition.portalType,
    branding: definition.branding,
    permissions: [],
  };
}
