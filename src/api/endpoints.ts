const API_PREFIX = '/v1' as const;

export const ENDPOINTS = {
  auth: {
    login: `${API_PREFIX}/members/login`,
    signup: `${API_PREFIX}/members/signup`,
    refresh: `${API_PREFIX}/members/refresh`,
  },
  members: {
    me: `${API_PREFIX}/members/me`,
  },
  plans: {
    base: `${API_PREFIX}/plans`,
    byId: (id: number | string) => `${API_PREFIX}/plans/${id}`,
  },
} as const;

export type Endpoints = typeof ENDPOINTS;