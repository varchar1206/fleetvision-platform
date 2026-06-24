import { useNavigate } from "react-router-dom";

export default function PortalAdminHome() {
  const navigate = useNavigate();

  const cards = [
    { title: "Organizations", route: "/portal/admin/organizations", description: "Manage shippers, brokers, carriers, and multi-role organizations." },
    { title: "Relationships", route: "/portal/admin/relationships", description: "Manage shipper-broker, shipper-carrier, broker-carrier, and carrier-driver links." },
    { title: "Drivers", route: "/portal/admin/drivers", description: "Manage driver profiles connected to carrier organizations." },
    { title: "Invitations", route: "/portal/admin/invitations", description: "Manage invited users and organizations before Cognito onboarding." },
  ];

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Portal Admin</h2>
          <p>Manage client organizations, roles, relationships, drivers, and invitations.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {cards.map((card) => (
          <div className="card" key={card.title}>
            <h2>{card.title}</h2>
            <p style={{ minHeight: "56px" }}>{card.description}</p>
            <button style={{ width: "100%" }} onClick={() => navigate(card.route)}>
              Open
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
