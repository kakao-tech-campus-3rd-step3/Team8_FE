import Modal from '@/components/Modal';
import { useState, type ComponentType } from 'react';

// ModalPropType: Window Props 필수 요소
export type ModalPropType = { closeModal: () => void };

// P: Window Props 선택 요소
export const useModal = <P extends object>({
  ModalWindow,
  modalProps = {} as P,
}: {
  ModalWindow: ComponentType<ModalPropType & P>;
  modalProps?: P;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const modal = open ? (
    <Modal>
      <ModalWindow {...modalProps} closeModal={closeModal} />
    </Modal>
  ) : null;
  return [modal, openModal] as const;
};
