import type { Message } from '@stomp/stompjs';
import { socketEventBus } from '../hooks/useSocketHandler';
import type { WayPointResponseType } from '../types/WaypointResponseBodyType';

export function WaypointDispatcherResolver(message: Message) {
  const wpData: WayPointResponseType = JSON.parse(message.body);
  console.log('WAYPOINT 메시지:', wpData);
  socketEventBus.dispatchEvent(new CustomEvent('WAYPOINT_EVENT', { detail: wpData }));
}
