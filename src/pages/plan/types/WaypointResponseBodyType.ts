import { type WaypointData } from '../flow/canvasComponents/Waypoint';

export type WayPointResponseType = {
  type: `WAYPOINT_CREATE` | `WAYPOINT_INIT`;
};

export type WayPointCreateType = {
  type: 'WAYPOINT_CREATE';
  waypoint: WaypointData;
};

export type WayPointInitType = {
  type: 'WAYPOINT_INIT';
  waypoints: WaypointData[];
};
