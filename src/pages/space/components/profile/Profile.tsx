import { useModal } from '@/hooks/useModal';
import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import styled from 'styled-components';
import InfoEditWindow from '@/pages/space/components/profile/InfoEditWindow';
import type { MemberType } from '@/types/member';
import type { MemberMe } from '@/pages/home/hooks/useMemberQuery';
import { useEffect } from 'react';
import { toastApiError } from '@/utils/apiError';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';

const fetchMemberInfo = async (): Promise<MemberType> => {
  // 서버 스키마는 { email, contact, username, mbti }
  const response = await axiosInstance.get<MemberMe>(ENDPOINTS.members.me);
  const me = response.data;
  // 화면/폼에서 사용하는 MemberType으로 매핑(name <- username)
  return {
    id: 0,
    email: me.email,
    name: me.username,
    contact: me.contact,
    mbti: me.mbti,
  };
};

function Profile() {
  const {
    data: member,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['memberInfo'],
    queryFn: fetchMemberInfo,
  });

  useEffect(() => {
    if (isError) toastApiError(error);
  }, [isError, error]);

  const [infoModalWindow, openInfoModal] = useModal(
    member
      ? {
          ModalWindow: InfoEditWindow,
          modalProps: {
            member,
          },
        }
      : { ModalWindow: () => null }
  );

  if (isLoading) return <ProfileWrapper>프로필 로딩 중...</ProfileWrapper>;
  if (isError) return <ProfileWrapper>프로필을 불러오는데 실패했습니다.</ProfileWrapper>;
  if (!member) return <ProfileWrapper>프로필 데이터가 없습니다.</ProfileWrapper>;

  return (
    <>
      {infoModalWindow}
      <ProfileWrapper>
        <EditInfoButton onClick={openInfoModal}>수정</EditInfoButton>
        <InfoSection>
          <Entry>
            <Section>이메일</Section>
            <Value>{member.email}</Value>
          </Entry>
          <Entry>
            <Section>이름</Section>
            <Value>{member.name}</Value>
          </Entry>
          <Entry>
            <Section>연락처</Section>
            <Value>{member.contact}</Value>
          </Entry>
          <Entry>
            <Section>MBTI</Section>
            <Value>{member.mbti}</Value>
          </Entry>
        </InfoSection>
      </ProfileWrapper>
    </>
  );
}

// 사진 섹션 제거

//==============<정보 섹션>==============

const EditInfoButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: ${colorSystem.primary_yellow._300};
  border: none;
  border-radius: 40px;
  padding: 8px 12px;
  cursor: pointer;
  margin-right: 24px;
  margin-top: 8px;
`;

const Entry = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
`;

const Section = styled.div`
  ${fontSystem.body.medium}
  font-weight: bold;
  color: ${colorSystem.tertiary_white._600};
`;

const Value = styled.div`
  ${fontSystem.body.medium}
  color: ${colorSystem.tertiary_white._700};
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

//==============<정보 섹션>==============

// 레이아웃 단순화로 HorizontalLayout 제거

// 반응형 깨지는 해상도 가로 픽셀 하한선: 320px
const ProfileWrapper = styled.div`
  width: 100%;
  max-width: 100%; /* 부모 콘텐츠 폭과 동일하게 */
  padding: 28px 20px; /* 내부 패딩 약간 증가 */

  display: flex;
  flex-direction: column;
  border-radius: 40px;
  border: 1px solid ${colorSystem.primary_yellow._300};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  margin: 0 auto; /* 가운데 정렬 */
  box-sizing: border-box; /* 보더 포함하여 100% 내에서 맞춤 */
`;

export default Profile;
