const API_PREFIX = '/v1' as const; //api 프리픽스 수정시 이곳만 수정

export const ENDPOINTS = {
  members: {
    login: `${API_PREFIX}/members/login`,
    signup: `${API_PREFIX}/members/signup`,
    me: `${API_PREFIX}/members/me`,
  },
} as const;

export type Endpoints = typeof ENDPOINTS;
