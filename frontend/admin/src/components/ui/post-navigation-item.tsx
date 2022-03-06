import { useTranslation } from "next-i18next";
import React from "react";
import NumberLabel from "./storybook/inputs/queue-number";

interface IPostNavigationItemProps {
  currentFormPosition: number;
  idx: number;
  label: string;
  isFilled: boolean;
  isActive: boolean;
  extraClass: string;
  onClick: () => void;
  navigateAble: boolean;
}

const PostNavigationItem: React.FC<IPostNavigationItemProps> = ({
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
      className={`z-10 px-10 bg-white py-1 rounded-t-md select-none cursor-default ${extraClass} border-2 flex-center
      ${isFilled && "opacity-40"}
      ${!isActive && navigateAble && "!cursor-pointer border-primary-hover"}
      ${isActive ? "!border-primary !border-b-transparent" : "border-b-primary"}
  `}
      onClick={onClick}
    >
      <h3
        className={`text-center sm:text-md font-bold flex items-center ${
          isFilled || isActive ? "text-primary" : "text-gray"
        } 
          ${!isActive && navigateAble && "!text-primary-hover"}
        `}
      >
        <NumberLabel
          // backgroundColor={isActive || isFilled ? "primary" : ""}
          className={`mr-3 !w-5 !h-5 ${!(isFilled || isActive) && "!bg-gray"} ${
            !isActive && navigateAble && "!bg-primary-hover"
          }`}
          number={idx + 1}
        />
        {t(label)}
      </h3>
    </div>
  );
};
export default PostNavigationItem;
