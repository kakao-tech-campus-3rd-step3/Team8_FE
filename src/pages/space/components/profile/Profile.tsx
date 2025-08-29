import { useModal } from '@/hooks/useModal';
import { colorSystem } from '@/styles/colorSystem';
import { fontSystem } from '@/styles/fontSystem';
import styled from 'styled-components';
import InfoEditWindow from '@/pages/space/components/profile/InfoEditWindow';
import type { MemberType } from '@/pages/space/types/member';
import PhotoEditWindow from '@/pages/space/components/profile/PhotoEditWindow';

const dummyProfileResponse = {
  status: 200,
  message: '내 정보를 불러왔습니다.',
  member: {
    id: 1234,
    email: 'example@test.com',
    name: '홍길동',
    contact: '+82-10-1234-1234',
    mbti: 'ISTP',
  } as MemberType,
};

function Profile() {
  const member = dummyProfileResponse.member;

  const [infoModalWindow, openInfoModal] = useModal({
    ModalWindow: InfoEditWindow,
    modalProps: {
      member,
    },
  });

  const [photoModalWindow, openPhotoModal] = useModal({
    ModalWindow: PhotoEditWindow,
  });

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

//==============<사진 섹션>==============

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

//==============<사진 섹션>==============

//==============<정보 섹션>==============

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

//==============<정보 섹션>==============

const HorizontalLayout = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  gap: 16px;
`;

// 반응형 깨지는 해상도 가로 픽셀 하한선: 320px
const ProfileWrapper = styled.div`
  min-width: calc(100% - 2 * 40px); // 좌우 padding 값
  padding: 40px;

  display: flex;
  flex-direction: column;
  border-radius: 40px;
  box-shadow: 0 2px 12px rgba(255, 192, 77, 0.3);
`;

export default Profile;
