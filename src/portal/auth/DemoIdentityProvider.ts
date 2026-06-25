import type { PortalKey } from "../config/portalDefinitions";
import type { IdentityProvider } from "./IdentityProvider";
import type { PortalIdentity } from "./PortalIdentity";

export const demoIdentityProvider: IdentityProvider = {
  async getCurrentIdentity(portal: PortalKey): Promise<PortalIdentity> {
    return {
      id: `demo-${portal}-identity`,
      portal,
      organizationId: `demo-${portal}-organization`,
      userId: `demo-${portal}-user`,
      email: `${portal}.user@fleetvision.demo`,
      roles: [`${portal}-admin`],
      groups: ["demo-users"],
      isAuthenticated: true,
    };
  },
};
