import { NavLink } from "react-router-dom";

import FleetCard from "../ui/FleetCard";

const processLinks = [
  { label: "Build From Data", path: "/v2/dispatch/load-builder" },
  { label: "Upload Load File", path: "/v2/dispatch/load-upload" },
  { label: "Upload Locations", path: "/v2/dispatch/locations" },
  { label: "Category Rules", path: "/v2/dispatch/category-rules" },
  { label: "Validate Loads", path: "/v2/dispatch/load-validation" },
  { label: "Approval Queue", path: "/v2/dispatch/approval-queue" },
];

export default function DispatchProcessNav() {
  return (
    <FleetCard>
      <div className="process-nav">
        {processLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "process-nav-link active" : "process-nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </FleetCard>
  );
}
