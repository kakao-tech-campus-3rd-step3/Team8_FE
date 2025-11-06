import { useSuspenseQuery, type UseSuspenseQueryResult } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

export type MemberMe = {
  email: string;
  contact: string;
  username: string;
  mbti: string;
};

const QUERY_KEY = ['memberInfo'] as const;

async function fetchMemberMe(): Promise<MemberMe> {
  const res = await axiosInstance.get(ENDPOINTS.members.me);
  return res.data as MemberMe;
}

export function useMemberQuery<TData = MemberMe>(): UseSuspenseQueryResult<TData, unknown> {
  return useSuspenseQuery<MemberMe, unknown, TData, typeof QUERY_KEY>({
    queryKey: QUERY_KEY,
    queryFn: fetchMemberMe,
    // 홈 재진입마다 항상 최신 데이터 요청
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });
}

export function useMemberUsername(): UseSuspenseQueryResult<string, unknown> {
  // 별도 쿼리 선언으로 username만 선택 반환
  return useSuspenseQuery<MemberMe, unknown, string, typeof QUERY_KEY>({
    queryKey: QUERY_KEY,
    queryFn: fetchMemberMe,
    select: (d) => d.username,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });
}
