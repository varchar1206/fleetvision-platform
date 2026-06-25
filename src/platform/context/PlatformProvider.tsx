import { createContext, type ReactNode } from "react";

import { demoPlatformServices } from "../services/DemoPlatformServices";
import type { PlatformServices } from "../services/PlatformServices";

export const PlatformContext = createContext<PlatformServices | null>(null);

type PlatformProviderProps = {
  children: ReactNode;
  services?: PlatformServices;
};

export function PlatformProvider({
  children,
  services = demoPlatformServices,
}: PlatformProviderProps) {
  return (
    <PlatformContext.Provider value={services}>
      {children}
    </PlatformContext.Provider>
  );
}
