import type { RouteData } from '../flow/canvasComponents/Route';
import type { BaseResponseBodyType } from './baseResponseBodyType';

export type RouteResponseType =
  | (BaseResponseBodyType & {
      type: 'INIT';
      ROUTE: RouteData[];
    })
  | (BaseResponseBodyType & {
      type: 'CREATE';
      ROUTE: RouteData;
    })
  | (BaseResponseBodyType & {
      type: 'UPDATE';
      ROUTE: RouteData;
    })
  | (BaseResponseBodyType & {
      type: 'DELETE';
      ROUTE: number;
    });
