import CheckmarkIcon from "@assets/icons/checkmark-icon";
import PencilIcon from "@assets/icons/pencil-icon";
import { COLORS } from "@utils/colors";
import { useTranslation } from "next-i18next";
import React from "react";
import Typography from "../ui/storybook/typography";

interface IForgotPasswordStepProps {
  title: string;
  subtitle: string;
  isFilled?: boolean;
  isActive?: boolean;
  isLast?: boolean;
}

const ForgotPasswordStepItem: React.FC<IForgotPasswordStepProps> = ({
  title,
  subtitle,
  isFilled,
  isActive,
  isLast,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flex align-top space-x-1 pb-10 border-l-2 transition-all duration-200
        ${!isFilled && "border-dashed"}
        ${isLast ? "border-primary" : "border-white"}
      `}
    >
      <div
        className={`rounded-full flex-shrink-0 border-2 w-7 h-7 flex-center border-white ${
          isActive || isFilled ? "bg-white" : "bg-primary"
        }`}
        style={{ transform: "translateX(-15px)" }}
      >
        {isFilled && (
          <CheckmarkIcon fill={COLORS.BOLDER} className={`w-3 h-3`} />
        )}
        {isActive && <PencilIcon fill={COLORS.BOLDER} className={`w-3 h-3`} />}
        {!isActive && !isFilled && (
          <PencilIcon fill={COLORS.WHITE} className={`w-3 h-3`} />
        )}
      </div>
      <div>
        <Typography weight="semibold" color="white" size="lg" text={title} />
        <Typography color="white" size="sm" text={subtitle} />
      </div>
    </div>
  );
};
export default ForgotPasswordStepItem;
