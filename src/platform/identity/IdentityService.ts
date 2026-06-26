import type { AuthenticationSession } from "./AuthenticationSession";
import { demoIdentityProvider } from "./DemoIdentityProvider";

export async function getCurrentAuthenticationSession(): Promise<AuthenticationSession | null> {
  return demoIdentityProvider.getCurrentSession();
}
