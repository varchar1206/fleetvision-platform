import type { AuthenticationSession } from "../../platform/identity/AuthenticationSession";
import type { PortalKey } from "../../portal/config/portalDefinitions";

export async function resolvePermissionsForSession(
  _session: AuthenticationSession,
  role: string,
  _portal: PortalKey
): Promise<string[]> {
  void _session;
  void _portal;

  return [role];
}
