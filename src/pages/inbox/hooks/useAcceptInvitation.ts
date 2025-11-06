import { useMutation } from '@tanstack/react-query';
import type { Invitation } from './useInvitationQuery';
import { ENDPOINTS } from '@/api/endpoints';
import { toast } from 'react-toastify';
import axiosInstance from '@/api/axiosInstance';

const acceptInvitation = async (invitation: Invitation) => {
  const res = await axiosInstance.post(ENDPOINTS.plans.accept(invitation.invitationId));
  return res.data;
};

export const useAcceptInvitation = () => {
  return useMutation({
    mutationFn: acceptInvitation,
    onSuccess: (data) => {
      toast.success('초대 수락에 성공하였습니다.');
      console.log(data);
    },
    onError: (error) => {
      toast.error('초대 수락에 실패하였습니다.');
      console.log(error);
    },
  });
};
