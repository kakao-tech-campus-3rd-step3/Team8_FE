import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import { useAuth } from '@/hooks/useAuth';

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken?: string;
  refreshToken?: string;
}

async function loginApi(params: LoginParams): Promise<LoginResponse> {
  const res = await axiosInstance.post(ENDPOINTS.auth.login, params);
  return res.data as LoginResponse;
}

export function useLoginMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      if (!accessToken || !refreshToken) {
        // 토큰이 없으면 오류로 간주하여 상위 onError 흐름과 동일하게 처리되도록 throw
        throw new Error('로그인 응답에 토큰이 없습니다.');
      }
      // 세션 갱신 (라우팅은 호출부에서 처리)
      login({ accessToken, refreshToken });
    },
  });
}
