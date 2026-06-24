import { useNavigate } from "react-router-dom";

export default function CarrierWorkspaceHome() {
  const navigate = useNavigate();

  const cards = [
    { title: "Carrier Dashboard", route: "/v2/carrier/dashboard", description: "Monitor carrier operations and assigned freight." },
    { title: "Load Board", route: "/v2/carrier/load-board", description: "Accept, reject, dispatch, and assign carrier loads." },
    { title: "Driver Assignments", route: "/v2/carrier/driver-assignments", description: "Manage driver coverage and load assignments." },
    { title: "Active Loads", route: "/v2/carrier/active-loads", description: "Track carrier-managed active freight." },
    { title: "Exceptions", route: "/v2/carrier/exceptions", description: "Review carrier-side operational issues." },
    { title: "Performance", route: "/v2/carrier/performance", description: "Review carrier execution metrics." },
  ];

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Carrier Workspace</h2>
          <p>Carrier dispatch, load acceptance, driver assignment, and execution.</p>
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
