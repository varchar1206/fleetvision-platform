import type { PortalKey } from "../config/portalDefinitions";
import type { PortalIdentity } from "./PortalIdentity";

export interface IdentityProvider {
  getCurrentIdentity(portal: PortalKey): Promise<PortalIdentity>;
}
