import { useBlockScroll } from '@/hooks/useBlockScroll';
import styled from 'styled-components';

function Modal({ children }: { children: React.ReactNode }) {
  useBlockScroll();
  return <ModalWrapper>{children}</ModalWrapper>;
}

const ModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;
