import { socketEventBus } from '../hooks/useSocketHandler';
import type {
  MemoCreateType,
  MemoInitType,
  MemoResponseType,
  MemoUpdateType,
} from '../types/MemoResponseBodyType';

export function MemoDispatcherResolver(message: any) {
  const memoData: MemoResponseType = JSON.parse(message.body);
  console.log('MEMO 메시지:', memoData);
  switch (memoData.type) {
    case 'INIT':
      const memoInit = memoData as MemoInitType;
      for (let i = 0; i < memoInit.MEMO.length; i++) {
        const memo = memoInit.MEMO[i];
        socketEventBus.dispatchEvent(
          new CustomEvent('MEMO_CREATE', { detail: { MEMO: { ...memo } } })
        );
      }
      break;
    case 'CREATE':
      const memoCreate = (memoData as MemoCreateType).MEMO;
      socketEventBus.dispatchEvent(
        new CustomEvent('MEMO_CREATE', { detail: { MEMO: { ...memoCreate } } })
      );
      break;
    case 'UPDATE':
      const memoUpdate = (memoData as MemoUpdateType).MEMO;
      socketEventBus.dispatchEvent(
        new CustomEvent('MEMO_UPDATE', { detail: { MEMO: { ...memoUpdate } } })
      );
      break;
  }
}
