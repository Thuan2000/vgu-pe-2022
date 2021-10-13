import React, {
  HTMLAttributes,
  StyleHTMLAttributes,
  SVGAttributes,
} from "react";
import Button from "./storybook/button";

interface IAlertProps extends React.HTMLAttributes<HTMLDivElement> {
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
  ...props
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
      className={`flex flex-col items-center text-center min-w-[320px] sm:min-w-[461px] ${className}`}
      {...props}
    >
      {Icon && <Icon {...iconProps} />}
      <h1 className="mt-5">{title}</h1>
      <p className="mb-5">{message}</p>
      <div className="flex items-center justify-between w-full mx-10">
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
