import { Link, Outlet } from "react-router-dom";

const groups = [
  {
    title: "Main",
    links: [
      { path: "/v2", label: "Dashboard" },
      { path: "/developer", label: "Developer Portal" },
      { path: "/mobile", label: "Mobile Portal" },
    ],
  },
  {
    title: "Shipper",
    links: [
      { path: "/", label: "Overview" },
      { path: "/planning", label: "Planning" },
      { path: "/tender-queue", label: "Tender Queue" },
      { path: "/active-loads", label: "Active Loads" },
    ],
  },
  {
    title: "Operations",
    links: [
      { path: "/broker", label: "Broker" },
      { path: "/carrier", label: "Carrier" },
      { path: "/driver", label: "Driver" },
    ],
  },
  {
    title: "System",
    links: [
      { path: "/notifications", label: "Notifications" },
      { path: "/events", label: "Events" },
      { path: "/gps", label: "GPS" },
      { path: "/locations", label: "Locations" },
    ],
  },
];

export default function AppShellV2() {
  return (
    <div className="v2-shell">
      <aside className="v2-sidebar">
        <h2>FleetVision</h2>

        {groups.map((group) => (
          <nav key={group.title} className="v2-nav-group">
            <p>{group.title}</p>
            {group.links.map((link) => (
              <Link key={link.path} to={link.path}>
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </aside>

      <div className="v2-main">
        <header className="v2-header">
          <h1>FleetVision UI V2</h1>
        </header>

        <div className="v2-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
