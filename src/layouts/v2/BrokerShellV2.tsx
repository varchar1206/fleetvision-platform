import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HamburgerButton from "../../components/navigation/HamburgerButton";

const brokerLinks = [
  { label: "Broker Dashboard", path: "/v2/broker" },
  { label: "Tender Queue", path: "/v2/broker/tenders" },
  { label: "Carrier Assignments", path: "/v2/broker/carrier-assignments" },
  { label: "Active Loads", path: "/v2/broker/active-loads" },
  { label: "Exceptions", path: "/v2/broker/exceptions" },
  { label: "Documents", path: "/v2/broker/documents" },
  { label: "Performance", path: "/v2/broker/performance" },
];

export default function BrokerShellV2() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="v2-shell">
      <aside className={isOpen ? "v2-sidebar open" : "v2-sidebar"}>
        <div className="v2-sidebar-brand">
          <h2>Broker Workspace</h2>
          <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </div>

        <nav className="v2-nav-group">
          {brokerLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <button
          className="v2-drawer-backdrop"
          aria-label="Close navigation"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="v2-main">
        <header className="v2-header">
          <HamburgerButton onClick={() => setIsOpen(true)} />

          <div>
            <h1>Broker Workspace</h1>
            <p>Broker-facing tender, carrier, and execution workspace</p>
          </div>
        </header>

        <div className="v2-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
