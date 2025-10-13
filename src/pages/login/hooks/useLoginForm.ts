import { useForm } from 'react-hook-form';
import { usePageRouting } from '@/hooks/usePageRouting';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormInputs } from '@/pages/login/utils/loginValidation';
import axiosInstance from '@/api/axiosInstance';
import { useAuth } from '@/hooks/useAuth';
import { ENDPOINTS } from '@/api/endpoints';

export const useLoginForm = () => {
  const routing = usePageRouting();
  const { login } = useAuth();
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
      const res = await axiosInstance.post(ENDPOINTS.members.login, {
        email: data.email,
        password: data.password,
      });

      const accessToken = res.data?.accessToken as string | undefined;
      const refreshToken = res.data?.refreshToken as string | undefined;

      if (!accessToken || !refreshToken) {
        throw new Error('로그인 응답에 토큰이 없습니다.');
      }
      login({ accessToken, refreshToken }); // user 정보 없이 토큰만으로 세션 유지
      alert('로그인에 성공했습니다!');
      routing.home();
    } catch (e) {
      console.error(e); // 이후 에러핸들링 로직 추가 예정
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
  };
};
