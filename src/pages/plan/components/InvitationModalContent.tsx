import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import type { AxiosError } from 'axios';
import {
  ModalWindowWrapper,
  WindowTopBar,       
  WindowTitle,        
  CloseButton,
} from '../../space/styles/modalWindowStyle'; 
import Close from '@/assets/icons/Close';

interface ApiErrorResponse {
  message: string;
}

const inviteUserToPlan = async ({
  planId,
  email,
}: {
  planId: string;
  email: string;
}) => {
  const response = await axiosInstance.post(
    ENDPOINTS.plans.invite(planId), 
    null,
    {
      params: { email },   
 }
  );
  return response.data;
};

interface InvitationModalContentProps {
  closeModal: () => void;
  planId: string;
}

const InvitationModalContent = ({
  closeModal,
  planId,
}: InvitationModalContentProps) => {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');

  const {
    mutate: inviteUser,
    isPending: isInviting,
  } = useMutation({
    mutationFn: inviteUserToPlan,
    onSuccess: () => {
      alert('초대가 성공적으로 전송되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['planDetail', planId] });
      closeModal();
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      alert(
        `초대에 실패했습니다: ${
          error.response?.data?.message || '서버 오류'
        }`
      );
    },
  });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && planId) {
      inviteUser({ planId, email: email.trim() });
    }
  };

  return (
    <ModalWindowWrapper>
      <WindowTopBar>
        <WindowTitle>여행 멤버 초대하기</WindowTitle>
        <CloseButton onClick={closeModal}>
          <Close />
        </CloseButton>
      </WindowTopBar>

      <ContentWrapper>
        <SearchForm onSubmit={handleInvite}>
          <EmailInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="초대할 사용자의 이메일"
          />
          <SearchButton type="submit" disabled={isInviting}>
            {isInviting ? '초대중...' : '초대'}
          </SearchButton>
        </SearchForm>
      </ContentWrapper>
    </ModalWindowWrapper>
  );
};

export default InvitationModalContent;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex; 
  flex-direction: column;
  min-width: 350px; 
`;

const SearchForm = styled.form`
  display: flex;
  gap: 8px;
`;

const EmailInput = styled.input`
  flex-grow: 1;
  padding: 10px 12px;
  border: 1px solid ${colorSystem.tertiary_white._100};
  border-radius: 8px;
  ${fontSystem.body.large}

  &:focus {
    outline: none;
    border-color: ${colorSystem.primary_yellow._500};
  }
`;

const BaseButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  ${fontSystem.body.large}
  font-weight: 600;
  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SearchButton = styled(BaseButton)`
  background-color: ${colorSystem.primary_yellow._500};
  color: white;

  &:hover:not(:disabled) {
    background-color: ${colorSystem.primary_yellow._600};
  }
`;