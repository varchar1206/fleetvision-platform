import { useNavigate } from "react-router-dom";

export default function WorkspaceLauncher() {
  const navigate = useNavigate();

  const workspaces = [
    {
      title: "Dispatch Workspace",
      description: "Planning, execution, tenders, load management, and communications.",
      route: "/v2/dispatch",
    },
    {
      title: "Developer Workspace",
      description: "Automation, diagnostics, monitoring, testing, and simulation.",
      route: "/v2/developer",
    },
    {
      title: "Broker Workspace",
      description: "Broker-facing operations and carrier assignment.",
      route: "/v2/broker",
    },
    {
      title: "Carrier Workspace",
      description: "Carrier dispatch and driver management.",
      route: "/carrier",
    },
    {
      title: "Driver Workspace",
      description: "Mobile driver experience and load execution.",
      route: "/mobile",
    },
  ];

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Workspace Launcher</h2>
          <p>Select the FleetVision workspace you want to enter.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {workspaces.map((workspace) => (
          <div key={workspace.title} className="card">
            <h2>{workspace.title}</h2>

            <p style={{ minHeight: "60px" }}>
              {workspace.description}
            </p>

            <button
              onClick={() => navigate(workspace.route)}
              style={{ width: "100%" }}
            >
              Open Workspace
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
