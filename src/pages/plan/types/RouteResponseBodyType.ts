import type { RouteData } from '../flow/canvasComponents/Route';

export type RouteResponseType =
  | {
      type: 'INIT';
      ROUTE: RouteData[];
    }
  | {
      type: 'CREATE';
      ROUTE: RouteData;
    }
  | {
      type: 'UPDATE';
      ROUTE: RouteData;
    }
  | {
      type: 'DELETE';
      ROUTE: number;
    };
