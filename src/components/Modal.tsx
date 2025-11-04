import { useBlockScroll } from '@/hooks/useBlockScroll';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

function Modal({ children }: { children: React.ReactNode }) {
  useBlockScroll();
  return createPortal(<ModalWrapper>{children}</ModalWrapper>, document.body);
}

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; /* 모든 일반 콘텐츠 위에 표시 */

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;
