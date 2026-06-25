import type { PlatformServices } from "./PlatformServices";

export const demoPlatformServices: PlatformServices = {
  configuration: {
    environment: "development",
    region: "us-east-1",
    featureFlags: {
      demoMode: true,
      telemetry: false,
      auditLogging: false,
      communications: false,
      integrations: false,
    },
  },
};
