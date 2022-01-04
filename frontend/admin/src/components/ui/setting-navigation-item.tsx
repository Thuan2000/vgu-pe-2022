import { useTranslation } from "next-i18next";
import React from "react";

interface ISettingNavigationItemProps {
  currentFormPosition: number;
  idx: number;
  label: string;
  isFilled: boolean;
  isActive: boolean;
  extraClass: string;
  onClick: () => void;
  navigateAble: boolean;
}

const SettingNavigationItem: React.FC<ISettingNavigationItemProps> = ({
  currentFormPosition,
  idx,
  label,
  isFilled,
  isActive,
  extraClass,
  onClick,
  navigateAble,
}) => {
  const { t } = useTranslation("form");
  return (
    <div
      className={`z-10 px-10 bg-white py-1 rounded-t-md ${extraClass} border-2 flex-center
    ${(currentFormPosition > idx + 1 || navigateAble) && "cursor-pointer"}
    ${isFilled && "opacity-40"}
    ${isActive ? "border-primary border-b-transparent" : "border-b-primary"}
  `}
      onClick={onClick}
    >
      <h3
        className={`text-center sm:text-md font-bold flex items-center ${
          isFilled || isActive ? "text-primary" : "text-gray"
        }`}
      >
        {t(label)}
      </h3>
    </div>
  );
};
export default SettingNavigationItem;
