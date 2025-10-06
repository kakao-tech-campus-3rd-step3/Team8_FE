import type { MemoData } from '../flow/canvasComponents/Memo';

export type MemoResponseType = {
  type: `MEMO_CREATE` | `MEMO_INIT`;
};

export type MemoCreateType = {
  type: 'MEMO_CREATE';
  memo: MemoData;
};

export type MemoInitType = {
  type: 'MEMO_INIT';
  memos: MemoData[];
};
