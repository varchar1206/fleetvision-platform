import { useContext } from "react";

import { PlatformContext } from "./PlatformProvider";

export function usePlatform() {
  const platform = useContext(PlatformContext);

  if (!platform) {
    throw new Error("usePlatform must be used within PlatformProvider");
  }

  return platform;
}
