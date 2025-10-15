import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormInputs } from '@/pages/register/utils/registerValidation';
import { usePageRouting } from '@/hooks/usePageRouting';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import { useAuth } from '@/hooks/useAuth';

export const useRegisterForm = () => {
  const routing = usePageRouting();
  const { login } = useAuth();

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
      // confirmPassword 제외, phone -> contact로 매핑, mbti 빈 값이면 제외
      const { confirmPassword, mbti, phone, ...rest } = data;
      const payload = {
        ...rest, // name, email, password
        contact: phone,
        ...(mbti ? { mbti } : {}),
      };

      // const res = await axiosInstance.post(ENDPOINTS.members.signup, payload);
      const res = await axiosInstance.post(ENDPOINTS.auth.signup, payload);


      const accessToken = res.data?.accessToken as string | undefined;
      const refreshToken = res.data?.refreshToken as string | undefined;

      if (accessToken && refreshToken) {
        // 회원가입 후 자동 로그인 처리 (user 정보는 사용하지 않음)
        login({ accessToken, refreshToken });
        alert('회원가입이 완료되어 자동으로 로그인되었습니다.');
        routing.home();
      } else {
        alert('회원가입이 완료되었습니다. 로그인해 주세요.');
        routing.login();
      }
    } catch (e) {
      console.error(e); //이후 에러핸들링 로직 추가 예정
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isValid,
  };
};
