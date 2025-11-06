// import { useBlockScroll } from '@/hooks/useBlockScroll';
// import styled from 'styled-components';

// function Modal({ children }: { children: React.ReactNode }) {
//   useBlockScroll();
//   return <ModalWrapper>{children}</ModalWrapper>;
// }

// const ModalWrapper = styled.div`
//   width: 100vw;
//   height: 100vh;
//   position: fixed;
//   top: 0;
//   left: 0;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   background-color: rgba(0, 0, 0, 0.5);
// `;

// export default Modal;
import { type ReactNode } from 'react';
import styled from 'styled-components';
import { useBlockScroll } from '@/hooks/useBlockScroll';

interface ModalProps {
  children: ReactNode;
import { createPortal } from 'react-dom';

function Modal({ children }: { children: React.ReactNode }) {
  useBlockScroll();
  return createPortal(<ModalWrapper>{children}</ModalWrapper>, document.body);
}

const Modal = ({ children }: ModalProps) => {
  useBlockScroll(); // 팝업 띄울 시 스크롤 방지

  return (
    <Dimmed>
      <ModalContainer>{children}</ModalContainer>
    </Dimmed>
  );
};

export default Modal;

const Dimmed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);

  /* --- (수정) 100 -> 1100 (혹은 2000 등 더 높은 값) --- */
  z-index: 1100;
  /* ------------------------------------------- */
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* --- (수정) 101 -> 1101 (혹은 2001 등 더 높은 값) --- */
  z-index: 1101;
  /* ------------------------------------------- */
`;