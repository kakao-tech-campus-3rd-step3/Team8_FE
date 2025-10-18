import type { WaypointData } from '../flow/canvasComponents/Waypoint';

export type WayPointResponseType =
  | {
      type: 'INIT';
      WAYPOINT: WaypointData[];
    }
  | {
      type: 'CREATE';
      WAYPOINT: WaypointData;
    }
  | {
      type: 'UPDATE';
      WAYPOINT: WaypointData;
    }
  | {
      type: 'DELETE';
      WAYPOINT: number;
    };
