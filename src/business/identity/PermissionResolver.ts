import type { AuthenticationSession } from "../../platform/identity/AuthenticationSession";
import type { BusinessPermission } from "../models/BusinessPermission";
import type { BusinessPortalContext } from "../models/BusinessPortalContext";
import type { BusinessRole } from "../models/BusinessRole";

export async function resolvePermissionsForSession(
  _session: AuthenticationSession,
  role: BusinessRole,
  _context: BusinessPortalContext
): Promise<BusinessPermission[]> {
  void _session;
  void _context;

  return [
    {
      key: role.key,
      description: `${role.label} permission`,
    },
  ];
}
