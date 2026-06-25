import { Link, NavLink, Outlet } from "react-router-dom";
import { Bell, ChevronDown, Settings } from "lucide-react";

import {
  PortalSessionProvider,
  usePortalSession,
  type PortalKey,
} from "../session/PortalSessionProvider";

import "../../styles/portal.css";

type Props = {
  portal: PortalKey;
};

function PortalShellContent() {
  const session = usePortalSession();
  const { definition, branding } = session;

  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <div className="portal-product">
          <div className="portal-product-mark">FV</div>
          <div>
            <p className="portal-eyebrow">{branding.productName}</p>
            <h2>{definition.title}</h2>
          </div>
        </div>

        <div className="portal-company-card">
          <div className="portal-company-logo">
            {branding.companyInitials}
          </div>
          <div>
            <h3>{branding.companyName}</h3>
            <p>{branding.userRole}</p>
          </div>
        </div>

        <nav className="portal-nav" aria-label={`${definition.title} navigation`}>
          {definition.navigation.map((item) => (
            <NavLink
              key={`${item.label}-${item.path}`}
              to={item.path}
              end={item.path === definition.dashboardPath}
              className={({ isActive }) =>
                isActive ? "portal-nav-link active" : "portal-nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="portal-sidebar-footer">
          <Link to="/v2/workspaces">Workspace Launcher</Link>
        </div>
      </aside>

      <div className="portal-main">
        <header className="portal-header">
          <div>
            <p className="portal-eyebrow">{branding.companyName}</p>
            <h1>{definition.title}</h1>
            <p>{definition.subtitle}</p>
          </div>

          <div className="portal-header-actions">
            <button className="portal-icon-button" type="button" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button className="portal-icon-button" type="button" aria-label="Settings">
              <Settings size={18} />
            </button>
            <button className="portal-profile-button" type="button">
              <span className="portal-user-avatar">{branding.userInitials}</span>
              <span>
                <strong>{branding.userName}</strong>
                <small>{branding.userRole}</small>
              </span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        <main className="portal-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function PortalShellV2({ portal }: Props) {
  return (
    <PortalSessionProvider portal={portal}>
      <PortalShellContent />
    </PortalSessionProvider>
  );
}
