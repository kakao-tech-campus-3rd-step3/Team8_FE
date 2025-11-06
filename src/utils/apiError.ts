import type { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export function getServerMessage(error: unknown): string {
  const fallback = '요청을 처리할 수 없습니다.';
  if (!error || typeof error !== 'object') return fallback;
  // AxiosError 형태 추론
  const err = error as Partial<AxiosError> & { response?: { data?: any; statusText?: string } };
  const data = err.response?.data as any;
  const msg = typeof data?.message === 'string' ? data.message : undefined;
  if (msg) return msg;
  const statusText = err.response?.statusText;
  if (typeof statusText === 'string' && statusText.length > 0) return statusText;
  const generic = (error as any)?.message;
  if (typeof generic === 'string' && generic.length > 0) return generic;
  return fallback;
}

export function toastApiError(error: unknown) {
  const msg = getServerMessage(error);
  toast.error(msg);
}

