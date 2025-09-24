declare global {
  interface WindowEventMap {
    'auth:tokenRefreshed': CustomEvent<{
      accessToken: string | null;
      refreshToken?: string | null;
    }>;
    'auth:tokensCleared': Event;
  }
}
export {};
