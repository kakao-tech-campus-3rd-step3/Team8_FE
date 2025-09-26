import { useModal } from '@/hooks/useModal';
import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import styled from 'styled-components';
import InfoEditWindow from '@/pages/space/components/profile/InfoEditWindow';
import type { MemberType } from '@/types/member';
import PhotoEditWindow from '@/pages/space/components/profile/PhotoEditWindow';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';

const fetchMemberInfo = async () => {
  const response = await axiosInstance.get('v1/members/me'); // API 엔드포인트는 실제 주소에 맞게 수정해주세요
  return response.data;
};

function Profile() {
  const { data: memberData, isLoading, isError } = useQuery({
    queryKey: ['memberInfo'],
    queryFn: fetchMemberInfo
  });

  const [infoModalWindow, openInfoModal] = useModal({
    ModalWindow: InfoEditWindow,
    modalProps: {
      member: memberData?.member, // useQuery로부터 받은 데이터 사용
    },
  });

  const [photoModalWindow, openPhotoModal] = useModal({
    ModalWindow: PhotoEditWindow,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !memberData) return <div>오류가 발생했습니다.</div>;

  const member = memberData.member;
  
  return (
    <>
      {photoModalWindow}
      {infoModalWindow}
      <ProfileWrapper>
        <HorizontalLayout>
          <VerticalLayout>
            <ImagePlaceholder />
            <EditPictureButton onClick={openPhotoModal}>사진 수정</EditPictureButton>
          </VerticalLayout>
          <InfoSection>
            <Entry>
              <Section>이메일</Section>
              <div>{member.email}</div>
            </Entry>
            <Entry>
              <Section>이름</Section>
              <div>{member.name}</div>
            </Entry>
            <Entry>
              <Section>연락처</Section>
              <div>{member.contact}</div>
            </Entry>
            <Entry>
              <Section>MBTI</Section>
              <div>{member.mbti}</div>
            </Entry>
            <EditInfoButton onClick={openInfoModal}>수정</EditInfoButton>
          </InfoSection>
        </HorizontalLayout>
      </ProfileWrapper>
    </>
  );
}


const VerticalLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const ImagePlaceholder = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 64px;
  background-color: ${colorSystem.tertiary_white._400};
`;

const EditPictureButton = styled.button`
  color: ${colorSystem.primary_yellow._400};
  border: none;
  background-color: transparent;
`;


const EditInfoButton = styled.button`
  margin-top: 16px;
  background-color: ${colorSystem.primary_yellow._300};

  border: none;
  border-radius: 40px;

  width: 80px;
  padding: 12px;
  align-self: flex-end;
`;

const Entry = styled.div`
  display: flex;
`;

const Section = styled.div`
  ${fontSystem.body.medium}
  font-weight: bold;
  min-width: 52px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;


const HorizontalLayout = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  gap: 16px;
`;

const ProfileWrapper = styled.div`
  min-width: calc(100% - 2 * 40px); // 좌우 padding 값
  padding: 40px;

  display: flex;
  flex-direction: column;
  border-radius: 40px;
  box-shadow: 0 2px 12px rgba(255, 192, 77, 0.3);
`;

export default Profile;
