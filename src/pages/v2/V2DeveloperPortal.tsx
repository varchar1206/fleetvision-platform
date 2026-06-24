import { useNavigate } from "react-router-dom";

export default function V2DeveloperPortal() {
  const navigate = useNavigate();

  const cards = [
    { title: "Communication Monitor", route: "/v2/developer/communication-monitor", description: "Monitor communication engine activity." },
    { title: "Automation Center", route: "/v2/developer/automation-center", description: "Review automation rules and queues." },
    { title: "Event Processor", route: "/v2/developer/event-processor", description: "Inspect system event streams." },
    { title: "Geofence Simulator", route: "/v2/developer/geofence-simulator", description: "Simulate arrival and departure triggers." },
    { title: "Delivery Diagnostics", route: "/v2/developer/delivery-diagnostics", description: "Review message delivery and status diagnostics." },
  ];

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Developer Workspace</h2>
          <p>Testing, diagnostics, automation, communication monitoring, and simulation tools.</p>
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
