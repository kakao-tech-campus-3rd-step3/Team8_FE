import type { MemoData } from '../flow/canvasComponents/Memo';

export type MemoResponseType = {
  type: `CREATE` | `INIT` | `UPDATE`;
};

export type MemoCreateType = {
  type: 'CREATE';
  MEMO: MemoData;
};

export type MemoInitType = {
  type: 'INIT';
  MEMO: MemoData[];
};

export type MemoUpdateType = {
  type: 'UPDATE';
  MEMO: MemoData;
};
