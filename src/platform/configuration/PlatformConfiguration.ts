import type { Environment } from "./Environment";
import type { FeatureFlags } from "./FeatureFlags";

export interface PlatformConfiguration {
  environment: Environment;

  region: string;

  featureFlags: FeatureFlags;
}
