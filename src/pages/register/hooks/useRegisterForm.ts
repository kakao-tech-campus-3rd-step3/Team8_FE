import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormInputs } from '@/pages/register/utils/registerValidation';
import { usePageRouting } from '@/hooks/usePageRouting';
import { useRegisterMutation } from '@/pages/register/hooks/useRegisterMutation';
import { toast } from 'react-toastify';
import axios from 'axios';

export const useRegisterForm = () => {
  const routing = usePageRouting();
  const { mutate } = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  function getServerMessage(data: unknown): string | undefined {
    if (data && typeof data === 'object' && 'message' in data) {
      const msg = (data as { message?: unknown }).message;
      return typeof msg === 'string' ? msg : undefined;
    }
    return undefined;
  }

  const onSubmit = (data: RegisterFormInputs) => {
    mutate(data, {
      onSuccess: (res) => {
        // 토큰이 있으면 useRegisterMutation에서 자동 로그인 처리됨
        if (res.accessToken && res.refreshToken) {
          routing.home();
        } else {
          toast.error('회원가입이 완료되었습니다. 로그인해 주세요.');
          routing.login();
        }
      },
      onError: (e) => {
        const status = axios.isAxiosError(e) ? e.response?.status : undefined;
        if (status === 400) {
          toast.error('입력값을 확인해주세요.');
          return;
        }
        if (status === 409) {
          toast.error('이미 존재하는 계정입니다.');
          return;
        }
        if (status === 429) {
          toast.error('요청이 많습니다. 잠시 후 다시 시도하세요.');
          return;
        }
        if (typeof status === 'number' && status >= 500) {
          toast.error('서버 오류가 발생했습니다. 잠시 후 다시 시도하세요.');
          return;
        }
        const fallback = axios.isAxiosError(e)
          ? getServerMessage(e.response?.data) ?? e.message
          : '요청을 처리할 수 없습니다.';
        toast.error(fallback);
      },
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
  };
};
