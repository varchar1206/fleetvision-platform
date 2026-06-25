import type { AuthenticationSession } from "./AuthenticationSession";

export interface AuthenticationProvider {
  getCurrentSession(): Promise<AuthenticationSession | null>;

  signIn(email: string, password: string): Promise<AuthenticationSession>;

  signOut(): Promise<void>;

  refreshSession(): Promise<AuthenticationSession | null>;
}
