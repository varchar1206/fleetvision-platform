import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../../amplify/data/resource";

const client = generateClient<Schema>();

type Organization = Schema["Organization"]["type"];
type Invitation = Schema["Invitation"]["type"];

const now = () => new Date().toISOString();

export default function InvitationsAdminPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  const [invitedByOrganizationId, setInvitedByOrganizationId] = useState("");
  const [invitedEmail, setInvitedEmail] = useState("");
  const [invitedRole, setInvitedRole] = useState("BROKER_ADMIN");
  const [relationshipType, setRelationshipType] = useState("SHIPPER_BROKER");

  async function loadData() {
    const orgs = await client.models.Organization.list();
    const invites = await client.models.Invitation.list();

    setOrganizations(orgs.data);
    setInvitations(invites.data);
  }

  function getOrgName(id?: string | null) {
    return organizations.find((org) => org.id === id)?.companyName ?? id ?? "Unknown";
  }

  async function createInvitation() {
    if (!invitedByOrganizationId || !invitedEmail.trim()) return;

    await client.models.Invitation.create({
      invitedByOrganizationId,
      invitedEmail,
      invitedRole,
      relationshipType,
      status: "PENDING",
      inviteToken: crypto.randomUUID(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
      createdAt: now(),
    });

    setInvitedEmail("");

    await loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  const pendingCount = invitations.filter((invite) => invite.status === "PENDING").length;
  const acceptedCount = invitations.filter((invite) => invite.status === "ACCEPTED").length;
  const expiredCount = invitations.filter((invite) => invite.status === "EXPIRED").length;

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Onboarding Center</h2>
          <p>Invite shippers, brokers, carriers, and drivers before Cognito onboarding.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card"><h2>Pending</h2><p>{pendingCount}</p></div>
        <div className="card"><h2>Accepted</h2><p>{acceptedCount}</p></div>
        <div className="card"><h2>Expired</h2><p>{expiredCount}</p></div>
      </div>

      <div className="card">
        <h2>Create Invitation</h2>

        <div style={{ display: "grid", gap: "12px", maxWidth: "700px" }}>
          <select
            value={invitedByOrganizationId}
            onChange={(e) => setInvitedByOrganizationId(e.target.value)}
          >
            <option value="">Inviting Organization</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.companyName} ({org.organizationType})
              </option>
            ))}
          </select>

          <input
            placeholder="Invited Email"
            value={invitedEmail}
            onChange={(e) => setInvitedEmail(e.target.value)}
          />

          <select
            value={invitedRole}
            onChange={(e) => setInvitedRole(e.target.value)}
          >
            <option value="SHIPPER_ADMIN">Shipper Admin</option>
            <option value="BROKER_ADMIN">Broker Admin</option>
            <option value="CARRIER_ADMIN">Carrier Admin</option>
            <option value="DRIVER">Driver</option>
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

          <button onClick={createInvitation}>
            Create Invitation
          </button>
        </div>
      </div>

      <div className="table-card">
        <h2>Invitations ({invitations.length})</h2>

        <table>
          <thead>
            <tr>
              <th>Inviting Org</th>
              <th>Email</th>
              <th>Role</th>
              <th>Relationship</th>
              <th>Status</th>
              <th>Expires</th>
            </tr>
          </thead>

          <tbody>
            {invitations.map((invite) => (
              <tr key={invite.id}>
                <td>{getOrgName(invite.invitedByOrganizationId)}</td>
                <td>{invite.invitedEmail}</td>
                <td>{invite.invitedRole}</td>
                <td>{invite.relationshipType}</td>
                <td>{invite.status}</td>
                <td>{invite.expiresAt ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
