import type { Message } from '@stomp/stompjs';
import { socketEventBus } from '../hooks/useSocketHandler';
import type { RouteResponseType } from '../types/RouteResponseBodyType';

export function RouteDispatcherResolver(message: Message) {
  const routeData: RouteResponseType = JSON.parse(message.body);
  console.log('ROUTE 메시지:', routeData);
  socketEventBus.dispatchEvent(new CustomEvent('ROUTE_EVENT', { detail: routeData }));
}
