import { Link } from "react-router-dom";

const links = [
  { path: "/", label: "Dispatch Dashboard" },
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

export default function MobilePortal() {
  return (
    <main className="mobile-shell">
      <h1>FleetVision Mobile</h1>
      <p>Quick access for mobile testing.</p>

      <div className="mobile-link-list">
        {links.map((link) => (
          <Link key={link.path} to={link.path} className="mobile-link-card">
            {link.label}
          </Link>
        ))}
      </div>
    </main>
  );
}
