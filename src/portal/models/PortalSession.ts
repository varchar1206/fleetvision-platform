import type { PortalDefinition, PortalKey, PortalType } from "../config/portalDefinitions";
import type { PortalBranding } from "./PortalBranding";
import type { PortalOrganization } from "./PortalOrganization";
import type { PortalPermission } from "./PortalPermission";
import type { PortalTheme } from "./PortalTheme";
import type { PortalUser } from "./PortalUser";

export interface PortalSession {
  portal: PortalKey;

  portalType: PortalType;

  definition: PortalDefinition;

  organization: PortalOrganization;

  user: PortalUser;

  branding: PortalBranding;

  theme: PortalTheme;

  permissions: PortalPermission[];
}
