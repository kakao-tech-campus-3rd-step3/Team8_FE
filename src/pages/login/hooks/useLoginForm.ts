import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormInputs } from '@/pages/login/utils/loginValidation';
import axiosInstance from '@/api/axiosInstance';
import { STORAGE_KEYS } from '@/utils/storageKeys';
import { useAuth } from '@/hooks/useAuth';
import { ENDPOINTS } from '@/api/endpoints';

export const useLoginForm = () => {
  const navigate = useNavigate();
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
      let user = res.data?.user as any | undefined;

      if (!accessToken || !refreshToken) {
        throw new Error('로그인 응답에 토큰이 없습니다.');
      }

      if (!user) {
        // 로그인 POST 응답에 user 정보가 있다면 이 부분은 삭제
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        const me = await axiosInstance.get(ENDPOINTS.members.me);
        user = me.data;
      }

      login({ accessToken, refreshToken, user });
      navigate('/');
    } catch (e) {
      console.error(e); // 이후 에러핸들링 로직 추가 예정
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
    navigateToRegister,
  };
};
