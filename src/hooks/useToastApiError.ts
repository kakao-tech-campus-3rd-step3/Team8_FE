import { toast } from 'react-toastify';
import { useApiError, type AppError } from './useApiError';

export const useToastApiError = () => {
  const { handleError } = useApiError();

  const toastError = (err: AppError) => {
    toast.error(err.message);
  };

  const handleErrorWithToast = (e: unknown): AppError => {
    const appError = handleError(e);
    toast.error(appError.message);
    return appError;
  };

  return { handleError, handleErrorWithToast, toastError } as const;
};
