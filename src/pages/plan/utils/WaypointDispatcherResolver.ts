import { socketEventBus } from '../hooks/useSocketHandler';
import type {
  WayPointCreateType,
  WayPointInitType,
  WayPointResponseType,
  WayPointUpdateType,
} from '../types/WaypointResponseBodyType';

export function WaypointDispatcherResolver(message: any) {
  const wpData: WayPointResponseType = JSON.parse(message.body);
  console.log('WAYPOINT 메시지:', wpData);
  switch (wpData.type) {
    case 'INIT':
      const wpInit = wpData as WayPointInitType;
      for (let i = 0; i < wpInit.WAYPOINT.length; i++) {
        const waypoint = wpInit.WAYPOINT[i];
        socketEventBus.dispatchEvent(
          new CustomEvent('WAYPOINT_CREATE', { detail: { WAYPOINT: { ...waypoint } } })
        );
      }
      break;
    case 'CREATE':
      const wpCreate = (wpData as WayPointCreateType).WAYPOINT;
      socketEventBus.dispatchEvent(
        new CustomEvent('WAYPOINT_CREATE', { detail: { WAYPOINT: { ...wpCreate } } })
      );
      break;
    case 'UPDATE':
      const wpUpdate = (wpData as WayPointUpdateType).WAYPOINT;
      socketEventBus.dispatchEvent(
        new CustomEvent('WAYPOINT_UPDATE', { detail: { WAYPOINT: { ...wpUpdate } } })
      );
      break;
  }
}
