import DownVIcon from "@assets/icons/down-v-icon";
import { COLORS } from "@utils/colors";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "../link";

interface SidebarNavItem extends React.HTMLAttributes<HTMLDivElement> {
  href: string;
  label: string;
  isActive?: boolean;
  hasChildren?: boolean;
  isChildren?: boolean;
  Icon?: React.FC<any>;
}

const SidebarNavItem: React.FC<SidebarNavItem> = ({
  href,
  isActive,
  label,
  Icon,
  className,
  hasChildren,
  isChildren,
}) => {
  const { t } = useTranslation();

  return (
    <Link href={href}>
      <div
        className={`h-12 pl-11 flex items-center
        ${isActive && !isChildren && "border-r-2 border-primary"}
        ${isChildren && "ml-13 pl-0 border-l-[3px] border-primary"}
          ${className}
        `}
      >
        <li
          className={`flex items-center text-md font-semibold text-gray-300
            ${isActive && !isChildren && "!text-primary"}
            ${isChildren && "ml-[18px] py-3 px-7 w-full mr-5 rounded-sm"}
            ${
              isActive &&
              isChildren &&
              "!text-bold-color bg-primary bg-opacity-30"
            }
          `}
        >
          {Icon && (
            <Icon
              className="mr-3 w-4 h-4"
              fill={COLORS.GRAY?.[300]}
              isActive={isActive}
            />
          )}
          {t(label)}
        </li>
        {hasChildren && (
          <DownVIcon
            className={`ml-auto mr-5 transition-transform duration-200 
              ${isActive && "transform rotate-180"}
            `}
          />
        )}
      </div>
    </Link>
  );
};
export default SidebarNavItem;
