import { useState } from "react";
import { Outlet } from "react-router-dom";

import HamburgerButton from "../../components/navigation/HamburgerButton";
import NavigationDrawer from "../../components/navigation/NavigationDrawer";
import { workspaces } from "../../config/workspaces";

type WorkspaceKey = keyof typeof workspaces;

type Props = {
  workspace: WorkspaceKey;
};

export default function WorkspaceShellV2({ workspace }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const config = workspaces[workspace];

  return (
    <div className="v2-shell">
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <div className="v2-main">
        <header className="v2-header">
          <HamburgerButton onClick={() => setIsDrawerOpen(true)} />

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
