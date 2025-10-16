import { useForm } from 'react-hook-form';
import { usePageRouting } from '@/hooks/usePageRouting';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormInputs } from '@/pages/login/utils/loginValidation';
import { useLoginMutation } from '@/pages/login/hooks/useLoginMutation';
import { toast } from 'react-toastify';
import axios from 'axios';

function getServerMessage(data: unknown): string | undefined {
  if (data && typeof data === 'object' && 'message' in data) {
    const msg = (data as { message?: unknown }).message;
    return typeof msg === 'string' ? msg : undefined;
  }
  return undefined;
}

export const useLoginForm = () => {
  const routing = usePageRouting();
  const { mutate } = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          routing.home();
        },
        onError: (e) => {
          const status = axios.isAxiosError(e) ? e.response?.status : undefined;
          if (status === 400) {
            toast.error('이메일/비밀번호를 확인해주세요.');
            return;
          }
          if (status === 429) {
            toast.error('요청이 많습니다. 잠시 후 다시 시도하세요.');
            return;
          }
          if (status === 404) {
            toast.error('존재하지 않는 계정입니다.');
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
      }
    );
  };

  const navigateToRegister = () => {
    routing.register();
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    navigateToRegister,
  };
};
