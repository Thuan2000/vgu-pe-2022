import React, { useEffect } from "react";

interface IModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
  isOpen: boolean;
  isPhoneFullScreenContent: boolean;
}

const Modal: React.FC<IModalProps> = ({
  isOpen,
  children,
  className,
  onClose,
  isPhoneFullScreenContent,
  ...props
}) => {
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

  if (!isOpen) return <></>;

  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 overflow-x-hidden overflow-y-auto bg-black z-[100] bg-opacity-50 grid place-items-center ${className}`}
      onClick={onClose}
      {...props}
    >
      <div
        className={`w-full sm:w-fit-content sm:grid sm:place-items-center ${
          !isPhoneFullScreenContent && "grid place-items-center"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
