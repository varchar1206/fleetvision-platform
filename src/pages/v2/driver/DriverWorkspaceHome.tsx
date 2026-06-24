import { useNavigate } from "react-router-dom";

export default function DriverWorkspaceHome() {
  const navigate = useNavigate();

  const cards = [
    { title: "Driver Dashboard", route: "/v2/driver/dashboard", description: "Review assigned loads and driver activity." },
    { title: "Load Board", route: "/v2/driver/load-board", description: "View assigned driver loads and execution status." },
    { title: "Check Calls", route: "/v2/driver/check-calls", description: "Simulate or review driver check-in activity." },
    { title: "Events", route: "/v2/driver/events", description: "Review driver-generated load events." },
    { title: "Messages", route: "/v2/driver/messages", description: "Review driver communication workflow." },
  ];

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Driver Workspace</h2>
          <p>Driver load execution, check calls, events, and messaging.</p>
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
