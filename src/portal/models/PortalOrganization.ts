import type { PortalBranding } from "./PortalBranding";
import type { PortalPermission } from "./PortalPermission";

export interface PortalOrganization {
  id: string;

  name: string;

  type: string;

  branding: PortalBranding;

  permissions: PortalPermission[];
}
