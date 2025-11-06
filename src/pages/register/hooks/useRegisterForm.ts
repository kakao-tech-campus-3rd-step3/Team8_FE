import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormInputs } from '@/pages/register/utils/registerValidation';
import { usePageRouting } from '@/hooks/usePageRouting';
import { useRegisterMutation } from '@/pages/register/hooks/useRegisterMutation';
import { toastApiError } from '@/utils/apiError';

export const useRegisterForm = () => {
  const routing = usePageRouting();
  const { mutateAsync, isPending } = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await mutateAsync(data);
      if (res?.accessToken && res?.refreshToken) {
        routing.home();
      } else {
        routing.login();
      }
    } catch (e) {
      toastApiError(e);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    isPending,
  };
};
