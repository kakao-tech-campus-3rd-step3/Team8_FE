# [Journey Planner](https://www.journey-planner.org/) FE

**Journey Planner**는 사용자가 시각적인 캔버스 위에서 여행 일정을 손쉽게 계획하고 친구들과 실시간으로 공유하며 협업할 수 있는 웹 서비스입니다.

---

## 📖 서비스 소개

여행을 계획하는 과정은 종종 복잡하고 번거롭습니다. 여러 장소, 경로, 메모를 텍스트로만 관리하기는 어렵고, 여러 명의 친구와 계획을 동기화하는 것은 더욱 힘듭니다.

Journey Planner는 이러한 문제점을 해결하기 위해 **시각적인 플로우 캔버스**를 제공합니다. 사용자는 지도처럼 펼쳐진 캔버스 위에 **경유지(Waypoint)** 노드를 추가하고, 노드 간에 **경로(Route)** 엣지를 연결하여 전체 여행의 흐름을 한눈에 파악할 수 있습니다. 또한 **메모(Memo)** 노드를 통해 필요한 정보를 캔버스 어디에나 자유롭게 기록할 수 있습니다.

이 모든 과정은 **웹소켓(STOMP)**을 통해 **실시간으로 동기화**됩니다. 친구를 계획에 초대하면, 모든 참여자가 동시에 캔버스를 편집하고 변경 사항을 즉시 확인할 수 있어 진정한 실시간 협업이 가능합니다.

- [시연 영상](https://youtu.be/gdWLYMNU3ig)

## 🌟 주요 기능

* **시각적 일정 관리:** React Flow 캔버스를 통해 경유지(방문지), 경로(이동수단), 메모를 추가하고 시각적으로 배치합니다.
* **실시간 협업:** 웹소켓(STOMP)을 활용하여 여러 사용자가 동시에 캔버스에 접속해 일정을 편집하고 변경 사항을 실시간으로 공유받습니다.
* **사용자 인증:** 이메일/비밀번호 기반의 회원가입 및 토큰(Access/Refresh) 기반의 로그인 기능을 제공합니다.
* **초대 및 참여:** 이메일로 여행 계획에 친구를 초대하고, '받은 편지함'에서 초대를 수락/관리할 수 있습니다.
* **'나의 스페이스' (대시보드):** 사용자가 참여한 모든 여행 계획을 확인하고, 새로운 계획을 생성하며, 프로필(MBTI 등)을 관리할 수 있습니다.
* **PDF 내보내기:** 완성된 여행 일정을 깔끔한 PDF 문서로 다운로드할 수 있습니다.

## 📂 프로젝트 아키텍처

프로젝트의 소스 폴더 구조는 기능과 역할에 분리되어 있습니다.
```
└── src/
    ├── api/           # Axios 인스턴스, 엔드포인트, API 타입 정의
    ├── assets/        # 아이콘(SVG 컴포넌트)
    ├── components/    # 라우터, 모달, 스피너 등 공용 컴포넌트
    ├── contexts/      # 전역 상태 Context
    ├── hooks/         # 공용 커스텀 훅
    ├── pages/         # 페이지 단위의 최상위 컴포넌트
    │   ├── home/      # 메인 대시보드
    │   ├── inbox/     # 초대받은 편지함
    │   ├── landing/   # 랜딩 페이지
    │   ├── login/     # 로그인
    │   ├── plan/      # ⭐ 핵심 기능: 일정 캔버스 페이지
    │   │   ├── components/  # Plan 페이지 전용 컴포넌트
    │   │   ├── context/     # SocketContext
    │   │   ├── flow/        # React Flow 캔버스, 커스텀 노드/엣지
    │   │   ├── hooks/       # Plan 페이지 전용 훅 (소켓, 캔버스)
    │   │   └── pdf/         # PDF 생성 및 템플릿
    │   ├── register/  # 회원가입
    │   └── space/     # 나의 스페이스 (프로필, 계획 목록)
    ├── styles/        # 전역 스타일, 컬러/폰트 시스템
    ├── types/         # 전역 타입 정의
    └── utils/         # 유틸리티 함수 (경로, API 에러 핸들링)
```
---

## 🛠️ 기술 스택 및 아키텍처

본 프로젝트는 모던 프론트엔드 기술 스택을 기반으로 구축되었습니다.

### Frontend

| 구분 | 기술 | 설명 |
| :--- | :--- | :--- |
| **Core** | **React 19, TypeScript** | 컴포넌트 기반 UI 라이브러리와 정적 타입 시스템 |
| **Build Tool** | **Vite** | 빠르고 효율적인 프론트엔드 빌드 도구 |
| **State Management** | **React Query (TanStack Query)** | 서버 상태(API 데이터) 관리, 캐싱, 동기화 |
| | **React Context** | 클라이언트 전역 상태 관리 (인증, 소켓) |
| **Routing** | **React Router v7** | 선언적 라우팅 및 페이지 네비게이션 |
| **Styling** | **Styled-Components** | CSS-in-JS를 통한 동적 컴포넌트 스타일링 |
| **Forms** | **React Hook Form, Zod** | 폼 상태 관리 및 스키마 기반 유효성 검사 |
| **API Client** | **Axios** | HTTP 통신 및 토큰 자동 갱신 인터셉터 구현 |
| **Real-time** | **Stomp.js, SockJS** | STOMP 프로토콜을 이용한 웹소켓 실시간 통신 |
| **Canvas** | **React Flow (`@xyflow/react`)** | 노드/엣지 기반의 시각적 캔버스 구현 |
| **Deployment** | **Vercel, GitHub Actions** | Vercel 배포 및 GitHub Actions를 통한 CI/CD |

## 🧑‍💻 팀원 소개

| 프로필 이미지 | 이름 | 역할 | GitHub |
| :--: | :--: | :--: | :--: |
| <img src="https://avatars.githubusercontent.com/u/65269430?s=88&v=4" width="100"> | 박수민 | Frontend tech-leader | [https://github.com/Moderator11 |
| <img src="https://avatars.githubusercontent.com/u/190569602?s=88&v=4" width="100"> | 김성진 | Frontend | https://github.com/seongjin0320 |
| <img src="https://avatars.githubusercontent.com/u/128571447?s=88&v=4" width="100"> | 남규리 | Frontend | https://github.com/whyyhyh |

## 프로젝트 실행

```bash
git clone git@github.com:kakao-tech-campus-3rd-step3/Team8_FE.git
cd Team8_FE
npm install
npm run dev
```

## 커밋 템플릿 설정

프로젝트 최초 clone시 다음 명령어를 실행해 커밋 템플릿을 적용해주세요.
```bash
git config commit.template .gitmessage
```
- 커밋 내용이 많다면 `-m` 옵션 없이 `git commit` 명령어로 템플릿을 사용해 형식에 맞춰 제목과 본문을 작성해주세요

## 알림 설정

레포에서 활동이 일어나면 바로 알 수 있도록(응답시간을 줄일 수 있도록) **watch 설정을 All Activity로 설정**하고, **모바일에서 이메일 알람을 설정**해주세요.
<img width="930" height="472" alt="image" src="https://github.com/user-attachments/assets/dbab8a43-8946-4c3f-ba8f-1395c04fa63e" />

## 디스커션 활용

개발중 생기는 질문, 논의는 이후에 추적이 쉽도록 Discussion을 활용해요!
<img width="949" height="564" alt="image" src="https://github.com/user-attachments/assets/fc4057b0-8902-450f-94cf-d4acd48efc10" />

## 브랜치 전략

### 브랜치 관리

- `main`: 모든 피드백이 반영된 최종 산출 코드 관리
- `refactor` 멘토 피드백 반영
- `develop`: 개발용 코드 관리
- `feature/*`: 기능별 개인 개발용 코드 관리

### 기능 개발

1. 새로운 기능, 페이지를 구현한다면 feature/기능 이름으로 새로운 브랜치를 생성해주세요. e.g. feature/LandingPage

2. 해당 브랜치에서 기능을 개발하세요

3. 개발이 끝나면 PR 템플릿 형식에 맞춰 PR을 생성해주세요 (병합 방향은 `feature/*` -> `develop` 입니다!)

- **다른 사람의 PR이 올라오면 피어 리뷰를 해주세요.**

## 개발 패널 사용방법

개발 서버를 실행시키고 웹을 실행하세요. 오른쪽편에서 **각 패널 위로 마우스를 올려 개발 패널에 접근**할 수 있습니다. (빨간 박스)
<img width="952" height="1026" alt="image" src="https://github.com/user-attachments/assets/132d43c5-c50f-40eb-9880-a0783a4df472" />


### 라우팅 패널
| 컴포넌트 | 기능 |
| :--- | :--- |
| **페이지** | <img width="144" height="347" alt="image" src="https://github.com/user-attachments/assets/187849bd-93cc-4401-ad38-f892d3f44d6d" /><br> - **페이지 이동**: 페이지간 이동이 구현되지 않아도 특정 페이지로 navigate 할 수 있습니다. |

----

### 색상 패널
| 컴포넌트 | 기능 |
| :--- | :--- |
| **색상** | <img width="741" height="266" alt="image" src="https://github.com/user-attachments/assets/ad0c3767-6432-4e4d-8259-0fa8f4b877e6" /><br> - **색상 미리보기**: `colorSystem`에 정의된 팔레트를 불러와 각각의 색상을 박스로 렌더링합니다.<br> - **클릭 시 클립보드 복사**: 박스를 클릭하면 해당 색상의 시스템 경로(`colorSystem.타입.레벨`)가 클립보드에 복사되고, 토스트 알림이 표시됩니다.<br> <img width="336" height="90" alt="image" src="https://github.com/user-attachments/assets/72479eda-8b49-4f98-9b1c-67d033d041e2" /> |

#### 색상 시스템 컬러 적용 방법
```
const ExampleButton = styled.div`
  background-color: ${colorSystem.primary_yellow._400}
`;
```
styled-component 스타일 선언에 위와 같이 코드를 삽입하면 hex 컬러가 설정됩니다.

----

### 폰트 패널
| 컴포넌트 | 기능 |
| :--- | :--- |
| **폰트** | <img width="779" height="219" alt="image" src="https://github.com/user-attachments/assets/f59109f3-eb48-464e-a4ab-4edd2a943e52" /><br> - **폰트 미리보기**: `fontSystem`에 정의된 폰트 스타일을 불러와 각각의 텍스트 박스로 렌더링합니다.<br> - **클릭 시 클립보드 복사**: 박스를 클릭하면 해당 폰트의 시스템 경로(`fontSystem.타입.크기`)가 클립보드에 복사되고, 토스트 알림이 표시됩니다.<br> <img width="338" height="96" alt="image" src="https://github.com/user-attachments/assets/9fe70885-675a-43fa-9e30-d209388e9148" /> |

#### 폰트 시스템 폰트 스타일 적용 방법
```
const ExampleTitleText = styled.div`
  ${fontSystem.title.large}
`;
```
styled-component 스타일 선언에 위와 같이 코드를 삽입하면 font-size와 font-weight가 설정됩니다.

## 설치된 패키지

- styled-components: JSX 스타일링
- react-router-dom: 페이지 라우팅
- vite-tsconfig-paths: alias 설정 통합
- react-toastify: 개발 패널 이벤트 토스트 알림

# README를 모두 숙지하셨다면 "README 숙지 완료" Discussion에 댓글을 달아주세요 :)
