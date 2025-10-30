import type { MemoData } from '../flow/canvasComponents/Memo';
import type { BaseResponseBodyType } from './baseResponseBodyType';

export type MemoResponseType =
  | (BaseResponseBodyType & {
      type: 'INIT';
      MEMO: MemoData[];
    })
  | (BaseResponseBodyType & {
      type: 'CREATE';
      MEMO: MemoData;
    })
  | (BaseResponseBodyType & {
      type: 'UPDATE';
      MEMO: MemoData;
    })
  | (BaseResponseBodyType & {
      type: 'DELETE';
      MEMO: number;
    });
