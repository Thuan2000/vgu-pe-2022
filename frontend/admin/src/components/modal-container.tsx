import React, { useEffect } from "react";
import { useModal } from "src/contexts/modal.context";
import Modal from "./ui/modal";

interface IModalContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalContainer: React.FC<IModalContainerProps> = () => {
  const {
    state: { isOpen, component: Component },
    closeModal,
  } = useModal();

  if (!Component) return <></>;

  return (
    <Modal
      isPhoneFullScreenContent={false}
      onClose={closeModal}
      isOpen={isOpen}
    >
      {typeof Component === "function" ? <Component /> : Component}
    </Modal>
  );
};
export default ModalContainer;
