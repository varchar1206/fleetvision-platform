import { useEffect, useState } from "react";
import type { Schema } from "../../../amplify/data/resource";
import {
  getDemoOrganizationByType,
  getRelationshipsForOrganization,
  getDriversForCarrier,
  type PortalType,
} from "../../services/portal/getPortalDemoData";

type BusinessRelationship = Schema["BusinessRelationship"]["type"];
type DriverProfile = Schema["DriverProfile"]["type"];

type Props = {
  portalType?: PortalType;
};

export default function RelationshipsPage({ portalType = "SHIPPER" }: Props) {
  const [relationships, setRelationships] = useState<BusinessRelationship[]>([]);
  const [drivers, setDrivers] = useState<DriverProfile[]>([]);

  useEffect(() => {
    async function loadRelationships() {
      const organization = await getDemoOrganizationByType(portalType);
      const relationshipRows = await getRelationshipsForOrganization(organization?.id);
      setRelationships(relationshipRows);

      if (portalType === "CARRIER" && organization?.id) {
        const driverRows = await getDriversForCarrier(organization.id);
        setDrivers(driverRows);
      }
    }

    loadRelationships();
  }, [portalType]);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Relationships</h2>
          <p>Saved shippers, brokers, carriers, and drivers display here.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Relationship Count</h2>
          <p>{relationships.length}</p>
        </div>

        <div className="card">
          <h2>Driver Count</h2>
          <p>{drivers.length}</p>
        </div>
      </div>

      <div className="table-card">
        <h2>Business Relationships</h2>
        <table>
          <thead>
            <tr>
              <th>Parent Org ID</th>
              <th>Child Org ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Preferred</th>
            </tr>
          </thead>
          <tbody>
            {relationships.map((relationship) => (
              <tr key={relationship.id}>
                <td>{relationship.parentOrganizationId}</td>
                <td>{relationship.childOrganizationId}</td>
                <td>{relationship.relationshipType}</td>
                <td>{relationship.status}</td>
                <td>{relationship.preferredPartner ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {portalType === "CARRIER" && (
        <div className="table-card">
          <h2>Drivers</h2>
          <table>
            <thead>
              <tr>
                <th>Driver</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id}>
                  <td>{driver.driverName}</td>
                  <td>{driver.email}</td>
                  <td>{driver.phone}</td>
                  <td>{driver.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
