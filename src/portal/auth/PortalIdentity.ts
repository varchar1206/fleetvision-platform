import type { PortalKey } from "../config/portalDefinitions";

export interface PortalIdentity {
  id: string;

  portal: PortalKey;

  organizationId: string;

  userId: string;

  email: string;

  roles: string[];

  groups: string[];

  isAuthenticated: boolean;
}
