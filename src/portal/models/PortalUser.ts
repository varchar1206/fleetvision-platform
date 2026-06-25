import type { PortalPermission } from "./PortalPermission";

export interface PortalUser {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  role: string;

  organizationId: string;

  permissions: PortalPermission[];

  avatarUrl?: string;
}
