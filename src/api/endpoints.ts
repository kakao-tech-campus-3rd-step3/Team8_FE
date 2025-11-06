const API_PREFIX = '/v1' as const;

export const ENDPOINTS = {
  auth: {
    login: `${API_PREFIX}/auth/login`,
    signup: `${API_PREFIX}/auth/signup`,
    refresh: `${API_PREFIX}/auth/refresh`,
  },
  members: {
    me: `${API_PREFIX}/members/me`,
  },
  plans: {
    base: `${API_PREFIX}/plans`,
    byId: (id: number | string) => `${API_PREFIX}/plans/${id}`,
    invitations: `${API_PREFIX}/plans/invitations`,
    accept: (id: number | string) => `${API_PREFIX}/plans/invitations/${id}/accept`,
    invite: (id: number | string) => `${API_PREFIX}/plans/invitations/${id}`,
    canvas: (id: number | string) => `${API_PREFIX}/plans/${id}/canvas`,
  },
} as const;

export type Endpoints = typeof ENDPOINTS;
