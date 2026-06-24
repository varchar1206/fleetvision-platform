import { useNavigate } from "react-router-dom";

export default function DispatchWorkspaceHome() {
  const navigate = useNavigate();

  const cards = [
    { title: "Daily Dashboard", route: "/v2/dispatch/dashboard", description: "Monitor today’s freight activity and KPIs." },
    { title: "Planning", route: "/v2/dispatch/planning", description: "Plan freight and prepare loads." },
    { title: "Tender Queue", route: "/v2/dispatch/tender-queue", description: "Tender loads and manage responses." },
    { title: "Active Loads", route: "/v2/dispatch/active-loads", description: "Track active freight execution." },
    { title: "Completed Loads", route: "/v2/dispatch/completed-loads", description: "Review delivered and completed freight." },
    { title: "Exceptions", route: "/v2/dispatch/exceptions", description: "Manage operational issues." },
    { title: "Performance", route: "/v2/dispatch/performance", description: "Review operational metrics." },
    { title: "Notifications", route: "/v2/dispatch/notifications", description: "Review workflow notifications." },
    { title: "Communication Actions", route: "/v2/dispatch/communication-actions", description: "Send broker and driver messages." },
    { title: "Communication Log", route: "/v2/dispatch/communication-log", description: "Review inbound and outbound communication history." },
    { title: "Driver Attestation Test", route: "/v2/dispatch/driver-attestation-test", description: "Simulate driver SMS replies and load status updates." },
    { title: "Event History", route: "/v2/dispatch/events", description: "Review load event history and system events." },
    { title: "GPS Tracking", route: "/v2/dispatch/gps", description: "Monitor shipment and asset location visibility." },
    { title: "Location Master", route: "/v2/dispatch/locations", description: "Manage location records and operational sites." },
  ];

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Dispatch Workspace</h2>
          <p>Planner and dispatcher operating center.</p>
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
