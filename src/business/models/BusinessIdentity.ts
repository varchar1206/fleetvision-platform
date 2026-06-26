import type { BusinessMembership } from "./BusinessMembership";
import type { BusinessOrganization } from "./BusinessOrganization";
import type { BusinessPermission } from "./BusinessPermission";
import type { BusinessRole } from "./BusinessRole";
import type { BusinessUser } from "./BusinessUser";

export interface BusinessIdentity {
  user: BusinessUser;
  organization: BusinessOrganization;
  membership: BusinessMembership;
  roles: BusinessRole[];
  permissions: BusinessPermission[];
}
