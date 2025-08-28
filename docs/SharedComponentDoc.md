# 공통 요소(컴포넌트, 훅, 스타일) 문서

프로젝트에서 사용되는 공통 요소들의 스펙을 정리합니다.

<details>
<summary>모달</summary>

## 모달

관련파일:

- components/Modal.tsx
- hooks/useModal.tsx

### 사용하기

먼저 모달 위에 띄울 윈도우 컴포넌트를 생성합니다.

주의: 모달에 사용될 윈도우는 닫기 기능 구현을 위해 closeModal 함수를 Props로 필수로 받아야 합니다.

```TypeScript
import type { ModalPropType } from '@/hooks/useModal';

function MyModalWindow({ closeModal }: ModalPropType) {
  return (
    <>
      예제 모달
      <button onClick={closeModal}>닫기</button>
    </>
  );
}
```

모달 윈도우를 띄울 컴포넌트에서 useModal 훅을 사용해 모달 컴포넌트(`modal`)와 열기 함수(`open`)를 받아와 사용합니다.

```TypeScript
function PageWithModal() {
  const [modal, open] = useModal({
    ModalWindow: MyModalWindow,
  });

  return (
    <>
      {modal}
      <button onClick={open}>모달 열기</button>
    </>
  );
}
```

### 모달 윈도우에 Props 전달하기

모달 컴포넌트에 prop을 넣고 & 연산자로 타입을 정의합니다.

```TypeScript
import type { ModalPropType } from '@/hooks/useModal';

function MyModalWindow({ closeModal, myprop }: ModalPropType & { myprop: string }) {
  return (
    <>
      예제 모달
      <button onClick={closeModal}>닫기</button>
    </>
  );
}
```

useModal 훅을 사용할 때, modalProps에 prop 값을 넣어줍니다.

```TypeScript
function PageWithModal() {
  const [modal, open] = useModal({
    ModalWindow: MyModalWindow,
    modalProps: {
      myprop: "HelloWorld",
    },
  });

  return (
    <>
      {modal}
      <button onClick={open}>모달 열기</button>
    </>
  );
}
```

</details>

<details>
<summary>개발 패널</summary>

## 개발 패널

관련파일:

- components/ColorPanel.tsx
- components/FontPanel.tsx
- components/RoutingPanel.tsx

설명:

개발 관련 패널들입니다. 3개의 패널이 `Router`에서 사용됩니다.
사용 방법은 프로젝트 README를 참고해주세요.

</details>
