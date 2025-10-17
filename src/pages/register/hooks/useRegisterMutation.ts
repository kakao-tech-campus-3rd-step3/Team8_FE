import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import { useAuth } from '@/hooks/useAuth';
import type { RegisterFormInputs } from '@/pages/register/utils/registerValidation';

export interface RegisterResponse {
  accessToken?: string;
  refreshToken?: string;
}

function toPayload(data: RegisterFormInputs) {
  const { confirmPassword, mbti, phone, ...rest } = data;
  return {
    ...rest, // name, email, password
    contact: phone,
    ...(mbti ? { mbti } : {}),
  };
}

async function registerApi(data: RegisterFormInputs): Promise<RegisterResponse> {
  const payload = toPayload(data);
  const res = await axiosInstance.post(ENDPOINTS.members.signup, payload);
  return res.data as RegisterResponse;
}

export function useRegisterMutation() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      if (accessToken && refreshToken) {
        // 회원가입 후 자동 로그인 처리 (user 정보는 사용하지 않음)
        login({ accessToken, refreshToken });
      }
    },
  });
}

