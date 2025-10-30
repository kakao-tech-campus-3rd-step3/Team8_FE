import type { WaypointData } from '../flow/canvasComponents/Waypoint';
import type { BaseResponseBodyType } from './baseResponseBodyType';

export type WayPointResponseType =
  | (BaseResponseBodyType & {
      type: 'INIT';
      WAYPOINT: WaypointData[];
    })
  | (BaseResponseBodyType & {
      type: 'CREATE';
      WAYPOINT: WaypointData;
    })
  | (BaseResponseBodyType & {
      type: 'UPDATE';
      WAYPOINT: WaypointData;
    })
  | (BaseResponseBodyType & {
      type: 'DELETE';
      WAYPOINT: number;
    });
