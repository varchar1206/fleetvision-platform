import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

type Organization = Schema["Organization"]["type"];
type BusinessRelationship = Schema["BusinessRelationship"]["type"];
type DriverProfile = Schema["DriverProfile"]["type"];

const now = () => new Date().toISOString();

const demoOrganizations = [
  { organizationType: "SHIPPER", companyName: "Blue Ridge Foods", displayName: "Blue Ridge Foods", email: "ops@blueridge.test", phone: "804-555-0101", status: "ACTIVE", verifiedStatus: "DEMO", source: "DEMO" },
  { organizationType: "SHIPPER", companyName: "Summit Retail Group", displayName: "Summit Retail", email: "logistics@summitretail.test", phone: "804-555-0102", status: "ACTIVE", verifiedStatus: "DEMO", source: "DEMO" },
  { organizationType: "BROKER", companyName: "Pioneer Freight Partners", displayName: "Pioneer Freight", email: "dispatch@pioneerfreight.test", phone: "804-555-0201", status: "ACTIVE", verifiedStatus: "DEMO", source: "DEMO" },
  { organizationType: "BROKER", companyName: "Atlas Brokerage Group", displayName: "Atlas Brokerage", email: "ops@atlasbrokerage.test", phone: "804-555-0202", status: "ACTIVE", verifiedStatus: "DEMO", source: "DEMO" },
  { organizationType: "CARRIER", companyName: "IronHorse Transport", displayName: "IronHorse", email: "dispatch@ironhorse.test", phone: "804-555-0301", status: "ACTIVE", verifiedStatus: "DEMO", source: "DEMO" },
  { organizationType: "CARRIER", companyName: "Liberty Linehaul", displayName: "Liberty Linehaul", email: "dispatch@libertylinehaul.test", phone: "804-555-0302", status: "ACTIVE", verifiedStatus: "DEMO", source: "DEMO" },
];

export default function ClientManagement() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [relationships, setRelationships] = useState<BusinessRelationship[]>([]);
  const [drivers, setDrivers] = useState<DriverProfile[]>([]);
  const [status, setStatus] = useState("");

  async function loadData() {
    const orgs = await client.models.Organization.list();
    const rels = await client.models.BusinessRelationship.list();
    const driverRows = await client.models.DriverProfile.list();

    setOrganizations(orgs.data);
    setRelationships(rels.data);
    setDrivers(driverRows.data);
  }

  async function seedDemoData() {
    setStatus("Seeding demo organizations...");

    const createdOrganizations: Organization[] = [];

    for (const org of demoOrganizations) {
      const result = await client.models.Organization.create({
        ...org,
        createdAt: now(),
        updatedAt: now(),
      });

      if (result.data) {
        createdOrganizations.push(result.data);
      }
    }

    const shipper = createdOrganizations.find((org) => org.organizationType === "SHIPPER");
    const broker = createdOrganizations.find((org) => org.organizationType === "BROKER");
    const carrier = createdOrganizations.find((org) => org.organizationType === "CARRIER");

    if (shipper && broker) {
      await client.models.BusinessRelationship.create({
        parentOrganizationId: shipper.id,
        childOrganizationId: broker.id,
        relationshipType: "SHIPPER_BROKER",
        status: "ACTIVE",
        preferredPartner: true,
        notes: "Demo shipper-broker relationship.",
        createdAt: now(),
        updatedAt: now(),
      });
    }

    if (shipper && carrier) {
      await client.models.BusinessRelationship.create({
        parentOrganizationId: shipper.id,
        childOrganizationId: carrier.id,
        relationshipType: "SHIPPER_CARRIER",
        status: "ACTIVE",
        preferredPartner: true,
        notes: "Demo direct shipper-carrier relationship.",
        createdAt: now(),
        updatedAt: now(),
      });
    }

    if (broker && carrier) {
      await client.models.BusinessRelationship.create({
        parentOrganizationId: broker.id,
        childOrganizationId: carrier.id,
        relationshipType: "BROKER_CARRIER",
        status: "ACTIVE",
        preferredPartner: true,
        notes: "Demo broker-carrier relationship.",
        createdAt: now(),
        updatedAt: now(),
      });
    }

    for (const org of createdOrganizations) {
      await client.models.UserProfile.create({
        organizationId: org.id,
        firstName: "Demo",
        lastName: org.organizationType ?? "User",
        email: org.email ?? "demo@fleetvision.test",
        phone: org.phone,
        role: `${org.organizationType}_ADMIN`,
        status: "ACTIVE",
        createdAt: now(),
        updatedAt: now(),
      });

      await client.models.DocumentRecord.create({
        organizationId: org.id,
        documentType: "COMPANY_PROFILE",
        fileName: `${org.companyName}-profile-placeholder.pdf`,
        fileKey: `demo/${org.id}/company-profile-placeholder.pdf`,
        fileMimeType: "application/pdf",
        fileSizeBytes: 0,
        visibility: "PRIVATE",
        status: "PLACEHOLDER",
        retentionCategory: "COMPANY_RECORD",
        createdAt: now(),
      });
    }

    if (carrier) {
      const driverNames = ["Marcus Reed", "Elena Torres", "James Walker", "Danielle Price"];

      for (const driverName of driverNames) {
        await client.models.DriverProfile.create({
          carrierOrganizationId: carrier.id,
          driverName,
          phone: "804-555-0400",
          email: driverName.toLowerCase().replace(" ", ".") + "@driver.test",
          status: "ACTIVE",
          createdAt: now(),
          updatedAt: now(),
        });
      }
    }

    setStatus("Demo client data seeded.");
    await loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Client Management</h2>
          <p>Seed and review demo shippers, brokers, carriers, drivers, and business relationships.</p>
        </div>

        <button onClick={seedDemoData}>Seed Demo Client Data</button>
      </div>

      {status && <div className="card"><p>{status}</p></div>}

      <div className="dashboard-grid">
        <div className="card"><h2>Organizations</h2><p>{organizations.length}</p></div>
        <div className="card"><h2>Relationships</h2><p>{relationships.length}</p></div>
        <div className="card"><h2>Drivers</h2><p>{drivers.length}</p></div>
      </div>

      <div className="table-card">
        <h2>Organizations</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org) => (
              <tr key={org.id}>
                <td>{org.organizationType}</td>
                <td>{org.companyName}</td>
                <td>{org.email}</td>
                <td>{org.phone}</td>
                <td>{org.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-card">
        <h2>Relationships</h2>
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

      <div className="table-card">
        <h2>Drivers</h2>
        <table>
          <thead>
            <tr>
              <th>Driver</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Carrier Org ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.driverName}</td>
                <td>{driver.email}</td>
                <td>{driver.phone}</td>
                <td>{driver.carrierOrganizationId}</td>
                <td>{driver.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
