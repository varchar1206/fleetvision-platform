import { Link } from "react-router-dom";
import { navigationGroups } from "../../config/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NavigationDrawer({ isOpen, onClose }: Props) {
  return (
    <>
      <aside className={isOpen ? "v2-sidebar open" : "v2-sidebar"}>
        <div className="v2-sidebar-brand">
          <h2>FleetVision</h2>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

        {navigationGroups.map((group) => (
          <nav key={group.title} className="v2-nav-group">
            <p>{group.title}</p>
            {group.links.map((link) => (
              <Link key={link.path} to={link.path} onClick={onClose}>
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </aside>

      {isOpen && (
        <button
          className="v2-drawer-backdrop"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}
    </>
  );
}
