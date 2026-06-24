import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

type Organization = Schema["Organization"]["type"];

const now = () => new Date().toISOString();

export default function OrganizationsAdminPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const [companyName, setCompanyName] = useState("");
  const [organizationType, setOrganizationType] = useState("SHIPPER");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function loadOrganizations() {
    const result = await client.models.Organization.list();
    setOrganizations(result.data);
  }

  async function createOrganization() {
    if (!companyName.trim()) return;

    const created = await client.models.Organization.create({
      companyName,
      organizationType,
      email,
      phone,
      status: "ACTIVE",
      verifiedStatus: "MANUAL",
      source: "ADMIN",
      createdAt: now(),
      updatedAt: now(),
    });

    if (created.data?.id) {
      await client.models.OrganizationRole.create({
        organizationId: created.data.id,
        roleType: organizationType,
        status: "ACTIVE",
        createdAt: now(),
        updatedAt: now(),
      });
    }

    setCompanyName("");
    setEmail("");
    setPhone("");

    await loadOrganizations();
  }

  useEffect(() => {
    loadOrganizations();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Organizations</h2>
          <p>Create and manage shippers, brokers, carriers, and organization roles.</p>
        </div>
      </div>

      <div className="card">
        <h2>Create Organization</h2>

        <div style={{ display: "grid", gap: "12px", maxWidth: "600px" }}>
          <input
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <select
            value={organizationType}
            onChange={(e) => setOrganizationType(e.target.value)}
          >
            <option value="SHIPPER">Shipper</option>
            <option value="BROKER">Broker</option>
            <option value="CARRIER">Carrier</option>
          </select>

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={createOrganization}>
            Create Organization
          </button>
        </div>
      </div>

      <div className="table-card">
        <h2>Organizations ({organizations.length})</h2>

        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Type</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {organizations.map((org) => (
              <tr key={org.id}>
                <td>{org.companyName}</td>
                <td>{org.organizationType}</td>
                <td>{org.email}</td>
                <td>{org.phone}</td>
                <td>{org.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
