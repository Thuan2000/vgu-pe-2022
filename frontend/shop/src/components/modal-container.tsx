import React from "react";
import { useModal } from "src/contexts/modal.context";
import Modal from "./ui/modal";

interface IModalContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalContainer: React.FC<IModalContainerProps> = () => {
  const {
    state: { isOpen, component: Component, modalProps },
    closeModal,
  } = useModal();

  const { onClose, closeOnClickOutside } = modalProps || {};

  function handleCloseModal() {
    if (onClose) onClose();
    closeModal();
  }
  if (!Component) return <></>;

  return (
    <Modal
      closeOnClickOutside={closeOnClickOutside}
      isPhoneFullScreenContent={true}
      onClose={handleCloseModal}
      isOpen={isOpen}
    >
      {typeof Component === "function" ? <Component /> : Component}
    </Modal>
  );
};
export default ModalContainer;
