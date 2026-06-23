import { Link } from "react-router-dom";

const links = [
  { path: "/", label: "Dispatch" },
  { path: "/planning", label: "Planning" },
  { path: "/active-loads", label: "Active Loads" },
  { path: "/broker", label: "Broker" },
  { path: "/carrier", label: "Carrier" },
  { path: "/driver", label: "Driver" },
  { path: "/notifications", label: "Notifications" },
  { path: "/events", label: "Events" },
  { path: "/gps", label: "GPS" },
  { path: "/locations", label: "Locations" },
  { path: "/mobile", label: "Mobile Portal" },
];

export default function DeveloperPortal() {
  return (
    <main className="app-shell developer-shell">
      <header className="top-bar">
        <div>
          <h1>FleetVision Developer Portal</h1>
          <p>Quick links to test each role and major workflow page.</p>
        </div>
        <div className="role-badge">Developer View</div>
      </header>

      <div className="developer-grid">
        {links.map((link) => (
          <Link className="developer-card" key={link.path} to={link.path}>
            {link.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
