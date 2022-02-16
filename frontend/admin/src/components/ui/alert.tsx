import TrashCanIcon from "@assets/icons/trash-can-icon";
import XIcon from "@assets/icons/x-icon";
import React, {
  HTMLAttributes,
  StyleHTMLAttributes,
  SVGAttributes,
} from "react";
import Button from "./storybook/button";

interface IAlertProps {
  className?: string;
  title: string;
  message?: string;
  iconProps?: HTMLAttributes<SVGAttributes<{}>>;
  icon?: React.FC<any>;
  positifButtonColor?: string;
  positifButtonText?: string;
  positifButtonStyle?: React.CSSProperties;
  onPositifClick?: () => void;
  negativeButtonColor?: string;
  negativeButtonText?: string;
  negativeButtonStyle?: React.CSSProperties;
  isLoadingPositif?: boolean;
  onClose: (isConfirmed?: boolean) => void;
  onNegativeClick?: () => void;
}

const Alert: React.FC<IAlertProps> = ({
  title,
  icon: Icon,
  message,
  positifButtonColor,
  positifButtonText = "Confirm",
  positifButtonStyle = {},
  isLoadingPositif = false,
  negativeButtonColor = "#FF3346",
  negativeButtonStyle = {},
  negativeButtonText = "Cancel",
  className,
  iconProps,
  onNegativeClick,
  onClose,
  onPositifClick,
}) => {
  function handleNegative() {
    if (onNegativeClick) onNegativeClick();
    onClose(false);
  }
  function handlePositif() {
    if (onPositifClick) onPositifClick();
    onClose(true);
  }

  return (
    <div
      className={`flex flex-col items-center text-center relative min-w-[320px] sm:min-w-[461px] min-h-[315px] bg-white px-4 py-6 pt-8 rounded-lg shadow-xl ${className}`}
    >
      <button onClick={() => onClose(false)}>
        <XIcon className="absolute right-5 top-5" />
      </button>
      {Icon && <Icon {...iconProps} />}
      <h1 className="mt-5">{title}</h1>
      <p className="mt-1">{message}</p>
      <div className="flex items-center justify-between w-full mx-10 mt-10">
        <Button
          className="border-gray-200 border p-3 w-[48%]"
          onClick={handleNegative}
          style={{
            backgroundColor: negativeButtonColor,
            ...negativeButtonStyle,
          }}
        >
          {negativeButtonText}
        </Button>
        <Button
          loading={isLoadingPositif}
          className="border-gray-200 border p-3 w-[48%]"
          autoFocus
          style={{ backgroundColor: positifButtonColor, ...positifButtonStyle }}
          onClick={handlePositif}
        >
          {positifButtonText}
        </Button>
      </div>
    </div>
  );
};
export default Alert;
