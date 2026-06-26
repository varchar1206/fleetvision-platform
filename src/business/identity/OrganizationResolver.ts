import type { AuthenticationSession } from "../../platform/identity/AuthenticationSession";
import type { PortalKey } from "../../portal/config/portalDefinitions";
import { portalDefinitions } from "../../portal/config/portalDefinitions";
import type { BusinessOrganization } from "../models/BusinessOrganization";

export async function resolveOrganizationForSession(
  _session: AuthenticationSession,
  portal: PortalKey
): Promise<BusinessOrganization> {
  void _session;

  const definition = portalDefinitions[portal];

  return {
    id: `demo-${portal}-organization`,
    name: definition.branding.companyName,
    type: definition.portalType,
    status: "ACTIVE",
  };
}
