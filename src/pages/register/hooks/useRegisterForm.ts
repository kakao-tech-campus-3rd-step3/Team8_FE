import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormInputs } from '@/pages/register/utils/registerValidation';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

export const useRegisterForm = () => {
  const navigate = useNavigate();

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
      // confirmPassword 제외, mbti가 빈 값이면 제거
      const { confirmPassword, mbti, ...rest } = data;
      const payload = { ...rest, ...(mbti ? { mbti } : {}) };

      await axiosInstance.post(ENDPOINTS.members.signup, payload);

      alert('회원가입이 완료되었습니다!');
      navigate('/login');
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
