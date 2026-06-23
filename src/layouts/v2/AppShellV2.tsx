import { useState } from "react";
import { Outlet } from "react-router-dom";

import HamburgerButton from "../../components/navigation/HamburgerButton";
import NavigationDrawer from "../../components/navigation/NavigationDrawer";

export default function AppShellV2() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
            <h1>FleetVision UI V2</h1>
            <p>Responsive operations workspace</p>
          </div>
        </header>

        <div className="v2-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
