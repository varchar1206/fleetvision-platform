import { useEffect, useState } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { getDemoOrganizationByType, type PortalType } from "../../services/portal/getPortalDemoData";

type Organization = Schema["Organization"]["type"];

type Props = {
  portalType?: PortalType;
};

export default function CompanyProfilePage({ portalType = "SHIPPER" }: Props) {
  const [organization, setOrganization] = useState<Organization | null>(null);

  useEffect(() => {
    getDemoOrganizationByType(portalType).then(setOrganization);
  }, [portalType]);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Company Profile</h2>
          <p>Company details, logo placeholder, DOT/MC numbers, and contact information.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Logo Placeholder</h2>
          <p>Future S3 upload area for company logo.</p>
          <button>Upload Logo</button>
        </div>

        <div className="card">
          <h2>{organization?.companyName ?? "No demo organization found"}</h2>
          <p><strong>Type:</strong> {organization?.organizationType ?? "N/A"}</p>
          <p><strong>Email:</strong> {organization?.email ?? "N/A"}</p>
          <p><strong>Phone:</strong> {organization?.phone ?? "N/A"}</p>
          <p><strong>DOT:</strong> {organization?.dotNumber ?? "N/A"}</p>
          <p><strong>MC:</strong> {organization?.mcNumber ?? "N/A"}</p>
          <p><strong>Status:</strong> {organization?.status ?? "N/A"}</p>
        </div>
      </div>
    </section>
  );
}
