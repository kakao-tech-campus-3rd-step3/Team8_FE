import { useSuspenseQuery, type UseSuspenseQueryResult } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

export type Invitation = {
  planId: number;
  planTitle: 'string';
  invitationId: number;
  status: 'string';
};

export type Invitations = Invitation[];

const QUERY_KEY = ['invitationInfo'] as const;

async function fetchInvitation(): Promise<Invitations> {
  const res = await axiosInstance.get(ENDPOINTS.plans.invitations);
  return res.data as Invitations;
}

export function useInvitationQuery<TData = Invitations>(): UseSuspenseQueryResult<TData, unknown> {
  return useSuspenseQuery<Invitations, unknown, TData, typeof QUERY_KEY>({
    queryKey: QUERY_KEY,
    queryFn: fetchInvitation,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
  });
}
