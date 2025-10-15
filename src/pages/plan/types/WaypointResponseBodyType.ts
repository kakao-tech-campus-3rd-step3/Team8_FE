import { type WaypointData } from '../flow/canvasComponents/Waypoint';

export type WayPointResponseType = {
  type: `CREATE` | `INIT` | `UPDATE`;
};

export type WayPointCreateType = {
  type: 'CREATE';
  WAYPOINT: WaypointData;
};

export type WayPointInitType = {
  type: 'INIT';
  WAYPOINT: WaypointData[];
};

export type WayPointUpdateType = {
  type: 'UPDATE';
  WAYPOINT: WaypointData;
};
