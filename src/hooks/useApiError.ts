import axios, { type AxiosError } from 'axios';

export type AppErrorType =
  | 'auth' // 401 (실제 처리는 axiosInstance에서 처리)
  | 'validation' // 400
  | 'not_found' // 404
  | 'client' // 그 외 4xx (401/404 제외)
  | 'server' // 5xx 전체
  | 'network' // 네트워크/타임아웃
  | 'cancelled' // 요청 취소
  | 'unknown';

export interface AppError {
  type: AppErrorType;
  status?: number;
  code?: string;
  message: string;
  fieldErrors?: Record<string, string>;
  raw?: unknown;
}

interface UseApiErrorOptions {
  // 각 페이지별 커스터마이즈 기능
  codeMessages?: Record<string, string>;
  typeMessages?: Partial<Record<AppErrorType, string>>;
  onAnyError?: (err: AppError) => void;
}

function normalizeAxiosError(e: unknown, opts?: UseApiErrorOptions): AppError {
  if (axios.isAxiosError(e)) {
    const err = e as AxiosError<any>;
    const status = err.response?.status;
    const data = err.response?.data as any | undefined;
    const serverCode = (data && typeof data === 'object' ? data.code : undefined) as
      | string
      | undefined;
    const serverMsg =
      (data && typeof data === 'object' ? (data.message as string | undefined) : undefined) ||
      err.message;

    const byCodeMsg = serverCode ? opts?.codeMessages?.[serverCode] : undefined;

    if (status === 401) {
      return {
        type: 'auth',
        status,
        code: serverCode,
        message: byCodeMsg ?? opts?.typeMessages?.auth ?? '인증이 필요합니다.',
        raw: e,
      };
    }
    if (status === 404) {
      return {
        type: 'not_found',
        status,
        code: serverCode,
        message: byCodeMsg ?? opts?.typeMessages?.not_found ?? '대상을 찾을 수 없습니다.',
        raw: e,
      };
    }
    if (status === 400) {
      const fieldErrors =
        (data && typeof data === 'object'
          ? (data.fieldErrors as Record<string, string>)
          : undefined) || undefined;
      const baseMsg = fieldErrors ? '입력값을 확인해주세요.' : '잘못된 요청입니다.';
      return {
        type: fieldErrors ? 'validation' : 'unknown',
        status,
        code: serverCode,
        message: byCodeMsg ?? opts?.typeMessages?.validation ?? serverMsg ?? baseMsg,
        fieldErrors,
        raw: e,
      };
    }
    if (typeof status === 'number' && status >= 500) {
      return {
        type: 'server',
        status,
        code: serverCode,
        message: byCodeMsg ?? opts?.typeMessages?.server ?? '서버 오류가 발생했습니다.',
        raw: e,
      };
    }

    // 그 외 4xx는 묶어서 client 에러로 처리
    if (typeof status === 'number' && status >= 400 && status < 500) {
      return {
        type: 'client',
        status,
        code: serverCode,
        message:
          byCodeMsg ?? opts?.typeMessages?.client ?? (serverMsg || '요청을 처리할 수 없습니다.'),
        raw: e,
      };
    }

    // status가 없거나 분류되지 않은 Axios 에러
    if (err.code === 'ECONNABORTED') {
      return { type: 'network', code: err.code, message: '요청이 시간 초과되었습니다.', raw: e };
    }
    if ((err as any).code === 'ERR_CANCELED') {
      return { type: 'cancelled', message: '요청이 취소되었습니다.', raw: e };
    }

    return {
      type: 'unknown',
      status,
      code: serverCode,
      message: byCodeMsg ?? serverMsg ?? '요청을 처리할 수 없습니다.',
      raw: e,
    };
  }

  // Axios 외 일반 오류
  return { type: 'unknown', message: '알 수 없는 오류가 발생했습니다.', raw: e };
}

export function useApiError(options: UseApiErrorOptions = {}) {
  const handleError = (e: unknown): AppError => {
    const appError = normalizeAxiosError(e, options);
    if (options.onAnyError) {
      try {
        options.onAnyError(appError);
      } catch {}
    }
    // 여기서는 UI 출력을 하지 않고 각 호출부에서 처리하도록 함
    return appError;
  };

  return { handleError };
}
