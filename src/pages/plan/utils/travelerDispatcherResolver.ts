import type { Message } from '@stomp/stompjs';
import { socketEventBus } from '../hooks/useSocketHandler';

export function TravelerDispatcherResolver(message: Message) {
  const travelerData = JSON.parse(message.body);
  console.log('TRAVELER 메시지:', travelerData);
  socketEventBus.dispatchEvent(new CustomEvent('TRAVELER_EVENT', { detail: travelerData }));
}
