import type { AuthenticationSession } from "../../../platform/identity/AuthenticationSession";
import type { PortalKey } from "../../config/portalDefinitions";
import { portalDefinitions } from "../../config/portalDefinitions";
import type { PortalSession } from "../../models/PortalSession";
import type { PortalTheme } from "../../models/PortalTheme";
import type { PortalUser } from "../../models/PortalUser";
import { resolveOrganizationForSession } from "../../../business/identity/OrganizationResolver";
import { resolveRoleForSession } from "../../../business/identity/RoleResolver";
import { resolvePermissionsForSession } from "../../../business/identity/PermissionResolver";

export async function buildPortalSession(
  authenticationSession: AuthenticationSession,
  portal: PortalKey
): Promise<PortalSession> {
  const definition = portalDefinitions[portal];
  const organization = await resolveOrganizationForSession(authenticationSession, portal);
  const role = await resolveRoleForSession(authenticationSession, organization, portal);
  const permissionKeys = await resolvePermissionsForSession(authenticationSession, role, portal);

  const permissions = permissionKeys.map((key) => ({
    key,
    description: `${key} permission`,
  }));

  const nameParts = (authenticationSession.displayName ?? definition.branding.userName).split(" ");

  const user: PortalUser = {
    id: authenticationSession.userId,
    firstName: nameParts[0] ?? "Demo",
    lastName: nameParts.slice(1).join(" ") || "User",
    email: authenticationSession.email,
    role,
    organizationId: organization.id,
    permissions,
  };

  const theme: PortalTheme = {
    sidebarStyle: "light",
    accentColor: definition.branding.accentColor,
    borderRadius: "18px",
  };

  return {
    portal,
    portalType: definition.portalType,
    definition,
    organization,
    user,
    branding: organization.branding,
    theme,
    permissions,
  };
}
