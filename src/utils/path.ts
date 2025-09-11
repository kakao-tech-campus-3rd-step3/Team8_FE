const BASE = {
  PLAN: '/plan/:id',
};

export const PATH = {
  ROOT: '/',
  LANDING: '/landing',
  HOME: '/home',
  LOGIN: '/login',
  REGISTER: '/register',
  SPACE: '/space',
  PLAN: {
    BASE: BASE.PLAN,
    WAYPOINT: `${BASE.PLAN}/waypoint`,
    TRAVELER: `${BASE.PLAN}/traveler`,
    MAP: `${BASE.PLAN}/map`,
    MEMO: `${BASE.PLAN}/memo`,
  },
};
