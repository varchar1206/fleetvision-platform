import { useNavigate } from "react-router-dom";

export default function BrokerWorkspaceHome() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Broker Dashboard",
      route: "/v2/broker/dashboard",
      description: "Monitor broker operations and KPIs.",
    },
    { title: "Tender Queue", route: "/v2/broker/tenders", description: "Review and respond to tendered loads." },
    { title: "Carrier Assignments", route: "/v2/broker/carrier-assignments", description: "Assign carrier capacity to accepted loads." },
    { title: "Active Loads", route: "/v2/broker/active-loads", description: "Monitor broker-managed active freight." },
    { title: "Exceptions", route: "/v2/broker/exceptions", description: "Review issues requiring broker attention." },
    { title: "Documents", route: "/v2/broker/documents", description: "Manage freight documents and records." },
    { title: "Performance", route: "/v2/broker/performance", description: "Review broker performance metrics." },
  ];

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Broker Workspace</h2>
          <p>Future broker-facing workspace using the V2 shell.</p>
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
