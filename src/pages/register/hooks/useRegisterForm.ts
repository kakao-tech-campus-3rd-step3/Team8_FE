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
      // 서버 스펙: { name, contact, email, password, mbti }
      // confirmPassword 제외, phone -> contact로 매핑(하이픈 제거), mbti 빈 값이면 제외
      const { confirmPassword, mbti, phone, ...rest } = data;
      const payload = {
        ...rest, // name, email, password
        contact: phone,
        ...(mbti ? { mbti } : {}),
      };

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
