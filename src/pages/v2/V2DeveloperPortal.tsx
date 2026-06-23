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

export default function V2DeveloperPortal() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Developer Portal</h2>
          <p>Quick links to test FleetVision workflows inside the V2 shell.</p>
        </div>
      </div>

      <div className="developer-grid">
        {links.map((link) => (
          <Link className="developer-card" key={link.path} to={link.path}>
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
