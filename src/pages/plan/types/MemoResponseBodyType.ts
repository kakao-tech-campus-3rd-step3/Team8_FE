import type { MemoData } from '../flow/canvasComponents/Memo';

export type MemoResponseType = {
  type: `MEMO_CREATE`;
};

export type MemoCreateType = {
  type: 'MEMO_CREATE';
  memo: MemoData;
};
