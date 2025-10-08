import type { MemoData } from '../flow/canvasComponents/Memo';

export type MemoResponseType = {
  type: `CREATE` | `INIT`;
};

export type MemoCreateType = {
  type: 'CREATE';
  MEMO: MemoData;
};

export type MemoInitType = {
  type: 'INIT';
  MEMO: MemoData[];
};
