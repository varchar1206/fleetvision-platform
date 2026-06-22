import { Link } from "react-router-dom";

const links = [
  { path: "/", label: "Shipper / Dispatch" },
  { path: "/planning", label: "Planning" },
  { path: "/active-loads", label: "Active Loads" },
  { path: "/broker", label: "Broker" },
  { path: "/carrier", label: "Carrier" },
  { path: "/driver", label: "Driver" },
  { path: "/notifications", label: "Notifications" },
  { path: "/events", label: "Events" },
  { path: "/gps", label: "GPS" },
  { path: "/locations", label: "Locations" },
];

export default function DeveloperPortal() {
  return (
    <main className="app-shell">
      <header className="top-bar">
        <div>
          <h1>FleetVision Developer Portal</h1>
          <p>Quick links to test each role and major workflow page.</p>
        </div>
        <div className="role-badge">Developer View</div>
      </header>

      <div className="dashboard-grid">
        {links.map((link) => (
          <Link className="card" key={link.path} to={link.path}>
            <h2>{link.label}</h2>
            <p>Open {link.label}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
