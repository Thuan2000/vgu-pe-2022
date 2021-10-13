import React, { useEffect } from "react";
import { useModal } from "src/contexts/modal.context";

interface IModalContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ModalContainer: React.FC<IModalContainerProps> = ({
  className,
  ...props
}) => {
  const {
    state: { isOpen, component: Component },
    closeModal,
  } = useModal();

  useEffect(() => {
    function hideBodyOverflow() {
      document.body.style.overflowY = "hidden";
    }

    function showBodyOverflow() {
      document.body.style.overflowY = "auto";
    }

    if (isOpen) hideBodyOverflow();
    else if (!isOpen) showBodyOverflow();
  }, [isOpen]);

  if (!isOpen || !Component) return <></>;

  return (
    <div
      className="w-screen h-screen overflow-x-hidden overflow-y-auto bg-black fixed z-[100]
      bg-opacity-50 py-3 grid place-items-center
    "
      onClick={closeModal}
    >
      <div
        className="bg-white mx-5 rounded-md p-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {typeof Component === "function" ? <Component /> : Component}
      </div>
    </div>
  );
};
export default ModalContainer;
