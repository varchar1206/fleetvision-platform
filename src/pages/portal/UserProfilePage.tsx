import { useEffect, useState } from "react";
import type { Schema } from "../../../amplify/data/resource";
import {
  getDemoOrganizationByType,
  getDemoUserProfileForOrganization,
  type PortalType,
} from "../../services/portal/getPortalDemoData";

type UserProfile = Schema["UserProfile"]["type"];

type Props = {
  portalType?: PortalType;
};

export default function UserProfilePage({ portalType = "SHIPPER" }: Props) {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const organization = await getDemoOrganizationByType(portalType);
      const userProfile = await getDemoUserProfileForOrganization(organization?.id);
      setProfile(userProfile);
    }

    loadProfile();
  }, [portalType]);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>User Profile</h2>
          <p>User details, avatar placeholder, role, phone, and email.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Avatar Placeholder</h2>
          <p>Future S3 upload area for user profile image.</p>
          <button>Upload Avatar</button>
        </div>

        <div className="card">
          <h2>{profile ? `${profile.firstName ?? ""} ${profile.lastName ?? ""}` : "No demo user profile found"}</h2>
          <p><strong>Email:</strong> {profile?.email ?? "N/A"}</p>
          <p><strong>Phone:</strong> {profile?.phone ?? "N/A"}</p>
          <p><strong>Role:</strong> {profile?.role ?? "N/A"}</p>
          <p><strong>Status:</strong> {profile?.status ?? "N/A"}</p>
        </div>
      </div>
    </section>
  );
}
