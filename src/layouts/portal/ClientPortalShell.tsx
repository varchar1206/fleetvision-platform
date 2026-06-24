import { Link, Outlet } from "react-router-dom";
import { clientPortals } from "../../config/clientPortals";

type PortalKey = keyof typeof clientPortals;

type Props = {
  portal: PortalKey;
};

export default function ClientPortalShell({ portal }: Props) {
  const config = clientPortals[portal];
  const basePath = `/portal/${portal}`;

  return (
    <div className="v2-shell">
      <aside className="v2-sidebar open">
        <div className="v2-sidebar-brand">
          <h2>{config.companyLabel}</h2>
          <p>{config.title}</p>
        </div>

        <nav className="v2-nav-group">
          <Link to={basePath}>Home</Link>
          <Link to={`${basePath}/company-profile`}>Company Profile</Link>
          <Link to={`${basePath}/user-profile`}>User Profile</Link>
          <Link to={`${basePath}/relationships`}>Relationships</Link>
          <Link to={`${basePath}/documents`}>Documents</Link>
          <Link to="/v2/workspaces">Workspace Launcher</Link>
        </nav>
      </aside>

      <div className="v2-main">
        <header className="v2-header">
          <div>
            <h1>{config.title}</h1>
            <p>{config.subtitle}</p>
          </div>
        </header>

        <div className="v2-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
