// const API_PREFIX = '/v1' as const;

// export const ENDPOINTS = {
//   auth: {
//     login: `${API_PREFIX}/auth/login`,
//     signup: `${API_PREFIX}/auth/signup`,
//     refresh: `${API_PREFIX}/auth/refresh`,
//   },
//   members: {
//     me: `${API_PREFIX}/members/me`,
//   },
//   plans: {
//     base: `${API_PREFIX}/plans`,
//     byId: (id: number | string) => `${API_PREFIX}/plans/${id}`,
//   },
// } as const;

// export type Endpoints = typeof ENDPOINTS;
// src/api/endpoints.ts

const API_PREFIX = '/v1' as const;

export const ENDPOINTS = {
  auth: {
    login: `${API_PREFIX}/auth/login`,
    signup: `${API_PREFIX}/auth/signup`,
    refresh: `${API_PREFIX}/auth/refresh`,
  },
  members: {
    me: `${API_PREFIX}/members/me`,
    // --- (신규) 이메일로 사용자 검색 ---
    search: `${API_PREFIX}/members/search`, // GET /v1/members/search?email=...
  },
plans: {
    base: `${API_PREFIX}/plans`,
    byId: (id: number | string) => `${API_PREFIX}/plans/${id}`,
    invite: (id: number | string) => `${API_PREFIX}/plans/invitations/${id}`,
    kick: (id: number | string) => `${API_PREFIX}/plans/invitations/${id}`,
  },
} as const;

export type Endpoints = typeof ENDPOINTS;