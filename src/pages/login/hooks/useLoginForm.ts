import { useForm } from 'react-hook-form';
import { usePageRouting } from '@/hooks/usePageRouting';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormInputs } from '@/pages/login/utils/loginValidation';
import { useLoginMutation } from '@/pages/login/hooks/useLoginMutation';
import { toastApiError } from '@/utils/apiError';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '@/utils/path';

type LoginRedirectState = {
  from?: { pathname?: string };
};

export const useLoginForm = () => {
  const routing = usePageRouting();
  const { mutateAsync, isPending } = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const from = (location.state as LoginRedirectState | undefined)?.from?.pathname ?? PATH.HOME;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await mutateAsync({ email: data.email, password: data.password });
      navigate(from, { replace: true });
    } catch (e) {
      toastApiError(e);
    }
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
    isPending,
  };
};
