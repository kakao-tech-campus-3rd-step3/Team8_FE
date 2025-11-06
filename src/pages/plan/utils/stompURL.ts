export default {
  SUB: {
    ERROR: `/user/queue/errors`,
    WAYPOINT: (planId: number) => `/topic/plans/${planId}/waypoints`,
    MEMO: (planId: number) => `/topic/plans/${planId}/memos`,
    ROUTE: (planId: number) => `/topic/plans/${planId}/routes`,
    TRAVELER: (planId: number) => `/topic/plans/${planId}/travelers`,
  },
  PUB: {
    WAYPOINT: {
      INIT: (planId: number) => `/app/plans/${planId}/waypoints/init`,
      CREATE: (planId: number) => `/app/plans/${planId}/waypoints/create`,
      UPDATE: (planId: number, waypointId: number) =>
        `/app/plans/${planId}/waypoints/${waypointId}/update`,
      DELETE: (planId: number, waypointId: number) =>
        `/app/plans/${planId}/waypoints/${waypointId}/delete`,
    },
    MEMO: {
      INIT: (planId: number) => `/app/plans/${planId}/memos/init`,
      CREATE: (planId: number) => `/app/plans/${planId}/memos/create`,
      UPDATE: (planId: number, memoId: number) => `/app/plans/${planId}/memos/${memoId}/update`,
      DELETE: (planId: number, memoId: number) => `/app/plans/${planId}/memos/${memoId}/delete`,
    },
    ROUTE: {
      INIT: (planId: number) => `/app/plans/${planId}/routes/init`,
      CREATE: (planId: number) => `/app/plans/${planId}/routes/create`,
      UPDATE: (planId: number, routeId: number) => `/app/plans/${planId}/routes/${routeId}/update`,
      DELETE: (planId: number, routeId: number) => `/app/plans/${planId}/routes/${routeId}/delete`,
    },
    TRAVELER: {
      INIT: (planId: number) => `/app/plans/${planId}/travelers/init`,
      DELETE: (planId: number, travelerId: number) =>
        `/app/plans/${planId}/travelers/${travelerId}/delete`,
    },
  },
} as const;
