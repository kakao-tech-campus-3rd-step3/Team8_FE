# Journey Planner FE

## 설치된 패키지

- styled-components: JSX 스타일링
- react-router-dom: 페이지 라우팅
- vite-tsconfig-paths: alias 설정 통합
- react-toastify: 개발 패널 이벤트 토스트 알림

## 프로젝트 실행

```bash
git clone git@github.com:kakao-tech-campus-3rd-step3/Team8_FE.git
cd Team8_FE
npm install
npm run dev
```

## 커밋 템플릿 설정

```bash
git config commit.template .gitmessage
```
커밋 내용이 많다면 `-m` 옵션 없이 `git commit` 명령어로 템플릿을 사용해 형식에 맞춰 제목과 본문을 작성해주세요 :)

## 개발 패널 사용방법

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

----
