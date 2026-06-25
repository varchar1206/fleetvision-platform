import { createContext, useContext, type ReactNode } from "react";

import {
  portalDefinitions,
  type PortalKey,
  type PortalType,
} from "../config/portalDefinitions";
import type { PortalOrganization } from "../models/PortalOrganization";
import type { PortalSession } from "../models/PortalSession";
import type { PortalTheme } from "../models/PortalTheme";
import type { PortalUser } from "../models/PortalUser";

const PortalSessionContext = createContext<PortalSession | null>(null);

type PortalSessionProviderProps = {
  portal: PortalKey;
  children: ReactNode;
};

export function PortalSessionProvider({ portal, children }: PortalSessionProviderProps) {
  const definition = portalDefinitions[portal];

  const organization: PortalOrganization = {
    id: `demo-${portal}-organization`,
    name: definition.branding.companyName,
    type: definition.portalType,
    branding: definition.branding,
    permissions: [],
  };

  const userNameParts = definition.branding.userName.split(" ");

  const user: PortalUser = {
    id: `demo-${portal}-user`,
    firstName: userNameParts[0] ?? "Demo",
    lastName: userNameParts.slice(1).join(" ") || "User",
    email: `${portal}.user@fleetvision.demo`,
    role: definition.branding.userRole,
    organizationId: organization.id,
    permissions: [],
  };

  const theme: PortalTheme = {
    sidebarStyle: "light",
    accentColor: definition.branding.accentColor,
    borderRadius: "18px",
  };

  const session: PortalSession = {
    portal,
    portalType: definition.portalType,
    definition,
    organization,
    user,
    branding: organization.branding,
    theme,
    permissions: [...organization.permissions, ...user.permissions],
  };

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
