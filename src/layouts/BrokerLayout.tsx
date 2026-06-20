import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { path: "/broker", label: "Dashboard" },
  { path: "/broker/tenders", label: "Tender Queue" },
  { path: "/broker/carrier-assignments", label: "Carrier Assignments" },
  { path: "/broker/active-loads", label: "Active Loads" },
  { path: "/broker/exceptions", label: "Exceptions" },
  { path: "/broker/documents", label: "Documents" },
  { path: "/broker/performance", label: "Performance" },
];

export default function BrokerLayout() {
  return (
    <main className="app-shell">
      <header className="top-bar">
        <div>
          <h1>FleetVision</h1>
          <p>Broker operations and carrier assignment dashboard</p>
        </div>
        <div className="role-badge">Broker View</div>
      </header>

      <nav className="nav-tabs">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </main>
  );
}
