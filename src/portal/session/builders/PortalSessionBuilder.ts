import type { AuthenticationSession } from "../../../platform/identity/AuthenticationSession";
import type { PortalKey } from "../../config/portalDefinitions";
import { portalDefinitions } from "../../config/portalDefinitions";
import type { PortalOrganization } from "../../models/PortalOrganization";
import type { PortalPermission } from "../../models/PortalPermission";
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

  const businessContext = {
    portalKey: portal,
    organizationType: definition.portalType,
    companyName: definition.branding.companyName,
    userRole: definition.branding.userRole,
  };

  const businessOrganization = await resolveOrganizationForSession(authenticationSession, businessContext);
  const businessRole = await resolveRoleForSession(authenticationSession, businessOrganization, businessContext);
  const businessPermissions = await resolvePermissionsForSession(
    authenticationSession,
    businessRole,
    businessContext
  );

  const portalPermissions: PortalPermission[] = businessPermissions.map((permission) => ({
    key: permission.key,
    description: permission.description,
  }));

  const portalOrganization: PortalOrganization = {
    id: businessOrganization.id,
    name: businessOrganization.name,
    type: businessOrganization.type,
    branding: definition.branding,
    permissions: portalPermissions,
  };

  const nameParts = (authenticationSession.displayName ?? definition.branding.userName).split(" ");

  const user: PortalUser = {
    id: authenticationSession.userId,
    firstName: nameParts[0] ?? "Demo",
    lastName: nameParts.slice(1).join(" ") || "User",
    email: authenticationSession.email,
    role: businessRole.label,
    organizationId: portalOrganization.id,
    permissions: portalPermissions,
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
    organization: portalOrganization,
    user,
    branding: portalOrganization.branding,
    theme,
    permissions: portalPermissions,
  };
}
