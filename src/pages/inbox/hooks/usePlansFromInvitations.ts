import { useFetchPlanDetail } from '@/pages/plan/hooks/useFetchPlanDetail';
import type { Invitation, Invitations } from './useInvitationQuery';

export function usePlansFromInvitations(invitations: Invitations) {
  const results = invitations.map((inv: Invitation) => useFetchPlanDetail(inv.planId.toString()));
  return results.map((r) => r.data);
}
