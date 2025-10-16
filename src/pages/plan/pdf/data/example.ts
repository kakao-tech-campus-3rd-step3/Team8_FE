import type { Schedule, Traveler } from '../types/PDFDataType';

export const travelers: Traveler[] = [
  {
    name: '안선우',
    phone: '+81-33-443-1234',
    email: 'sunja@nate.net',
    img: 'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png',
  },
  {
    name: '박철수',
    phone: '+82-10-1234-4731',
    email: 'parkcs@nate.net',
    img: 'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png',
  },
  {
    name: '김영희',
    phone: '+82-10-1004-9541',
    email: 'kimy@naver.com',
    img: 'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png',
  },
  {
    name: '이영희',
    phone: '+82-10-1134-8451',
    email: 'younghee@gmail.com',
    img: 'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png',
  },
  {
    name: '홍철수',
    phone: '+82-10-5234-4361',
    email: 'chulsu@hello.com',
    img: 'https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png',
  },
];

export const schedules: Schedule[] = [
  {
    type: 'waypoint',
    time: '10:22~11:23',
    title: '인천',
    address: '272 Gonghang-ro, Jung-gu, Incheon',
    description: '1 터미널 집합, OO에어 카운터 수속 후 15번 게이트에서 탑승',
    memo: '여권 챙기기',
  },
  {
    type: 'edge',
    title: '항공기 이동',
    description: '11:30분 출발, 비행편 링크: https://abcdefg.com',
  },
  {
    type: 'waypoint',
    time: '10:22~11:23', // Assuming this is a typo in the original and should be a different time
    title: 'LA',
    address: '272 Gonghang-ro, Jung-gu, Incheon',
    description: '1 터미널 집합, OO에어 카운터 수속 후 15번 게이트에서 탑승',
    memo: '여권 챙기기',
  },
  {
    type: 'edge',
    title: '차량 이동',
    description: '여행사 픽업 예정, 차량번호 452VFH',
  },
  {
    type: 'waypoint',
    time: '13:25~14:25',
    title: '호텔',
    address: '272 Hotel-ro, 42-21 street, USA',
    description: '호캉스 즐기기',
    memo: '호캉스 제대로 즐기기',
  },
  {
    type: 'edge',
    title: '택시 이동',
    description: '우버 예약, 예상 금액 50 USD',
  },
  {
    type: 'waypoint',
    time: '20:22~20:23',
    title: '한국',
    address: '272 Gonghang-ro, Jung-gu, Incheon',
    description: '1 터미널 해산',
    memo: '집 조심히 들어가기',
  },
];
