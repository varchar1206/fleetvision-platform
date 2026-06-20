import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/planning", label: "Planning" },
  { path: "/tender-queue", label: "Tender Queue" },
  { path: "/active-loads", label: "Active Loads" },
  { path: "/completed-loads", label: "Completed Loads" },
  { path: "/exceptions", label: "Exceptions" },
  { path: "/performance", label: "Performance" },
  { path: "/notifications", label: "Notifications" },
];

export default function ShipperLayout() {
  return (
    <main className="app-shell">
      <header className="top-bar">
        <div>
          <h1>FleetVision</h1>
          <p>Transportation visibility and execution platform</p>
        </div>
        <div className="role-badge">Shipper View</div>
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
