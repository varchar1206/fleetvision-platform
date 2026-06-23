import { Outlet } from "react-router-dom";

export default function AppShellV2() {
  return (
    <div className="v2-shell">
      <aside className="v2-sidebar">
        <h2>FleetVision</h2>

        <nav>
          <a href="/developer">Developer</a>
          <a href="/">Shipper</a>
          <a href="/broker">Broker</a>
          <a href="/carrier">Carrier</a>
          <a href="/driver">Driver</a>
          <a href="/mobile">Mobile</a>
        </nav>
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
