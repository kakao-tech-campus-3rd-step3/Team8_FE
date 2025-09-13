export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'jp.accessToken',
  REFRESH_TOKEN: 'jp.refreshToken',
  AUTH_USER: 'jp.authUser',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
