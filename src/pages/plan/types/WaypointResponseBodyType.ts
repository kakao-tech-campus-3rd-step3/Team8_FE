import { type WaypointData } from '../flow/canvasComponents/Waypoint';

export type WayPointResponseType = {
  type: `CREATE` | `INIT`;
};

export type WayPointCreateType = {
  type: 'CREATE';
  WAYPOINT: WaypointData;
};

export type WayPointInitType = {
  type: 'INIT';
  WAYPOINT: WaypointData[];
};
