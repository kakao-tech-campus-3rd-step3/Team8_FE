import type { MemoData } from '../flow/canvasComponents/Memo';

export type MemoResponseType =
  | {
      type: 'INIT';
      MEMO: MemoData[];
    }
  | {
      type: 'CREATE';
      MEMO: MemoData;
    }
  | {
      type: 'UPDATE';
      MEMO: MemoData;
    }
  | {
      type: 'DELETE';
      MEMO: number;
    };
