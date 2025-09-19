import { type Plan } from '../pages/home/components/TripSection';

// 회원 정보 Mock 데이터
export const mockMemberResponse = {
  status: 200,
  message: '내 정보를 불러왔습니다.',
  member: {
    id: 1,
    email: 'user@example.com',
    name: '안선우',
    contact: '010-1234-5678',
    mbti: 'INFP',
  },
};

// 여행 계획 Mock 데이터
export const mockPlans: Plan[] = [
  { id: 1, title: '부산 여름 휴가', description: '친구들과 함께!', startDate: '2024-08-15', endDate: '2024-08-18' },
  { id: 2, title: '제주도 가족 여행', description: '가족과 힐링', startDate: '2024-09-10', endDate: '2024-09-14' },
  { id: 3, title: '나 홀로 강릉 여행', description: '생각 정리하기', startDate: '2024-10-05', endDate: '2024-10-06' },
];