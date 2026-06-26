import type { BusinessOrganization } from "./BusinessOrganization";
import type { BusinessRole } from "./BusinessRole";
import type { BusinessUser } from "./BusinessUser";

export interface BusinessMembership {
  user: BusinessUser;
  organization: BusinessOrganization;
  role: BusinessRole;
}
