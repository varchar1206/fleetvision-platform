import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

type Organization = Schema["Organization"]["type"];
type BusinessRelationship = Schema["BusinessRelationship"]["type"];

const now = () => new Date().toISOString();

export default function RelationshipsAdminPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [relationships, setRelationships] = useState<BusinessRelationship[]>([]);

  const [parentOrganizationId, setParentOrganizationId] = useState("");
  const [childOrganizationId, setChildOrganizationId] = useState("");
  const [relationshipType, setRelationshipType] = useState("SHIPPER_BROKER");

  async function loadData() {
    const orgs = await client.models.Organization.list();
    const rels = await client.models.BusinessRelationship.list();

    setOrganizations(orgs.data);
    setRelationships(rels.data);
  }

  function getOrgName(id?: string | null) {
    return organizations.find((org) => org.id === id)?.companyName ?? id ?? "Unknown";
  }

  async function createRelationship() {
    if (!parentOrganizationId || !childOrganizationId) return;
    if (parentOrganizationId === childOrganizationId) return;

    await client.models.BusinessRelationship.create({
      parentOrganizationId,
      childOrganizationId,
      relationshipType,
      status: "ACTIVE",
      preferredPartner: true,
      notes: "Created from Portal Admin.",
      createdAt: now(),
      updatedAt: now(),
    });

    setParentOrganizationId("");
    setChildOrganizationId("");

    await loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Relationships</h2>
          <p>Create and manage business relationships between organizations.</p>
        </div>
      </div>

      <div className="card">
        <h2>Create Relationship</h2>

        <div style={{ display: "grid", gap: "12px", maxWidth: "700px" }}>
          <select
            value={parentOrganizationId}
            onChange={(e) => setParentOrganizationId(e.target.value)}
          >
            <option value="">Select Parent Organization</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.companyName} ({org.organizationType})
              </option>
            ))}
          </select>

          <select
            value={childOrganizationId}
            onChange={(e) => setChildOrganizationId(e.target.value)}
          >
            <option value="">Select Child Organization</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.companyName} ({org.organizationType})
              </option>
            ))}
          </select>

          <select
            value={relationshipType}
            onChange={(e) => setRelationshipType(e.target.value)}
          >
            <option value="SHIPPER_BROKER">Shipper → Broker</option>
            <option value="SHIPPER_CARRIER">Shipper → Carrier</option>
            <option value="BROKER_CARRIER">Broker → Carrier</option>
            <option value="CARRIER_DRIVER">Carrier → Driver</option>
          </select>

          <button onClick={createRelationship}>
            Create Relationship
          </button>
        </div>
      </div>

      <div className="table-card">
        <h2>Relationships ({relationships.length})</h2>

        <table>
          <thead>
            <tr>
              <th>Parent</th>
              <th>Child</th>
              <th>Type</th>
              <th>Status</th>
              <th>Preferred</th>
            </tr>
          </thead>

          <tbody>
            {relationships.map((relationship) => (
              <tr key={relationship.id}>
                <td>{getOrgName(relationship.parentOrganizationId)}</td>
                <td>{getOrgName(relationship.childOrganizationId)}</td>
                <td>{relationship.relationshipType}</td>
                <td>{relationship.status}</td>
                <td>{relationship.preferredPartner ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
