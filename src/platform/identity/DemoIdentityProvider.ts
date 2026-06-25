import type { AuthenticationProvider } from "./AuthenticationProvider";
import type { AuthenticationSession } from "./AuthenticationSession";

export const demoIdentityProvider: AuthenticationProvider = {
  async getCurrentSession(): Promise<AuthenticationSession> {
    return {
      userId: "demo-platform-user",
      email: "demo.user@fleetvision.demo",
      displayName: "Demo User",
      isAuthenticated: true,
    };
  },

  async signIn(email: string): Promise<AuthenticationSession> {
    return {
      userId: "demo-platform-user",
      email,
      displayName: "Demo User",
      isAuthenticated: true,
    };
  },

  async signOut(): Promise<void> {
    return;
  },

  async refreshSession(): Promise<AuthenticationSession> {
    return this.getCurrentSession() as Promise<AuthenticationSession>;
  },
};
