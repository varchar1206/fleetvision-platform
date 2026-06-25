export interface AuthenticationSession {
  userId: string;

  email: string;

  displayName?: string;

  accessToken?: string;

  refreshToken?: string;

  expiresAt?: string;

  isAuthenticated: boolean;
}
