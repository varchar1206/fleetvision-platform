import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import { demoIdentityProvider } from "../../platform/identity/DemoIdentityProvider";
import { buildPortalSession } from "./builders/PortalSessionBuilder";
import type { PortalSession } from "../models/PortalSession";
import type { PortalKey, PortalType } from "../config/portalDefinitions";

const PortalSessionContext = createContext<PortalSession | null>(null);

type PortalSessionProviderProps = {
  portal: PortalKey;
  children: ReactNode;
};

export function PortalSessionProvider({ portal, children }: PortalSessionProviderProps) {
  const [session, setSession] = useState<PortalSession | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSession() {
      const authenticationSession = await demoIdentityProvider.getCurrentSession();

      if (!authenticationSession) {
        return;
      }

      const portalSession = await buildPortalSession(authenticationSession, portal);

      if (isMounted) {
        setSession(portalSession);
      }
    }

    loadSession();

    return () => {
      isMounted = false;
    };
  }, [portal]);

  if (!session) {
    return (
      <div className="portal-session-loading">
        Loading portal session...
      </div>
    );
  }

  return (
    <PortalSessionContext.Provider value={session}>
      {children}
    </PortalSessionContext.Provider>
  );
}

export function usePortalSession() {
  const session = useContext(PortalSessionContext);

  if (!session) {
    throw new Error("usePortalSession must be used within PortalSessionProvider");
  }

  return session;
}

export type { PortalKey, PortalType };
