import type { Message } from '@stomp/stompjs';
import { socketEventBus } from '../hooks/useSocketHandler';
import type { MemoResponseType } from '../types/memoResponseBodyType';

export function MemoDispatcherResolver(message: Message) {
  const memoData: MemoResponseType = JSON.parse(message.body);
  console.log('MEMO 메시지:', memoData);
  socketEventBus.dispatchEvent(new CustomEvent('MEMO_EVENT', { detail: memoData }));
}
