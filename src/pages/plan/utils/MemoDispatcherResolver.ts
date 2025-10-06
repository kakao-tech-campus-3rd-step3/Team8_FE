import { socketEventBus } from '../hooks/useSocketHandler';
import type { MemoCreateType, MemoInitType, MemoResponseType } from '../types/MemoResponseBodyType';

export function MemoDispatcherResolver(message: any) {
  const memoData: MemoResponseType = JSON.parse(message.body);
  console.log('WAYPOINT 메시지:', memoData);
  switch (memoData.type) {
    case 'MEMO_INIT':
      const memoInit = memoData as MemoInitType;
      for (let i = 0; i < memoInit.memos.length; i++) {
        const memo = memoInit.memos[i];
        socketEventBus.dispatchEvent(new CustomEvent('MEMO_CREATE', { detail: { memo } }));
      }
      break;
    case 'MEMO_CREATE':
      const memoCreate = memoData as MemoCreateType;
      socketEventBus.dispatchEvent(new CustomEvent('MEMO_CREATE', { detail: memoCreate }));
      break;
  }
}
