import type { AuthenticationSession } from "../../platform/identity/AuthenticationSession";
import type { PortalKey } from "../../portal/config/portalDefinitions";
import type { BusinessPermission } from "../models/BusinessPermission";
import type { BusinessRole } from "../models/BusinessRole";

export async function resolvePermissionsForSession(
  _session: AuthenticationSession,
  role: BusinessRole,
  _portal: PortalKey
): Promise<BusinessPermission[]> {
  void _session;
  void _portal;

  return [
    {
      key: role.key,
      description: `${role.label} permission`,
    },
  ];
}
