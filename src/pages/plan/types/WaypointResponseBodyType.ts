import { type WaypointData } from '../flow/canvasComponents/Waypoint';

export type WayPointResponseType = {
  type: `WAYPOINT_CREATE`;
};

export type WayPointCreateType = {
  type: 'WAYPOINT_CREATE';
  waypoint: WaypointData;
};
