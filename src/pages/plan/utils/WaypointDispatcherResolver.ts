import { socketEventBus } from '../hooks/useSocketHandler';
import type {
  WayPointCreateType,
  WayPointInitType,
  WayPointResponseType,
} from '../types/WaypointResponseBodyType';

export function WaypointDispatcherResolver(message: any) {
  const wpData: WayPointResponseType = JSON.parse(message.body);
  console.log('WAYPOINT 메시지:', wpData);
  switch (wpData.type) {
    case 'WAYPOINT_INIT':
      const wpInit = wpData as WayPointInitType;
      for (let i = 0; i < wpInit.waypoints.length; i++) {
        const waypoint = wpInit.waypoints[i];
        socketEventBus.dispatchEvent(new CustomEvent('WAYPOINT_CREATE', { detail: { waypoint } }));
      }
      break;
    case 'WAYPOINT_CREATE':
      const wpCreate = wpData as WayPointCreateType;
      socketEventBus.dispatchEvent(new CustomEvent('WAYPOINT_CREATE', { detail: wpCreate }));
      break;
  }
}
