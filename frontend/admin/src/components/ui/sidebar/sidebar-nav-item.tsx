import DownVIcon from "@assets/icons/down-v-icon";
import UpVIcon from "@assets/icons/up-v-icon";
import React from "react";
import { useTranslation } from "react-i18next";
import Link from "../link";
import { SC_LEFT_SPACING } from "./sidebar-constants";

interface SidebarNavItem extends React.HTMLAttributes<HTMLDivElement> {
  href: string;
  label: string;
  isActive?: boolean;
  hasChildren?: boolean;
  Icon?: React.FC<any>;
}

const SidebarNavItem: React.FC<SidebarNavItem> = ({
  href,
  isActive,
  label,
  Icon,
  className,
  hasChildren,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Link href={href}>
      <div
        className={`h-12 pl-11 border-r-4 border-transparent pl-${SC_LEFT_SPACING} flex items-center ${
          isActive && "bg-primary bg-opacity-30 border-primary"
        } ${className}`}
        {...props}
      >
        <li
          className={`flex items-center text-md ${
            isActive && "text-semibold font-semibold"
          }`}
        >
          {Icon && <Icon className="mr-3" isActive={isActive} />}
          {t(label)}
        </li>
        {hasChildren && (
          <DownVIcon
            className={`ml-auto mr-5 transition-transform duration-200 ${
              isActive && "transform rotate-180"
            }`}
          />
        )}
      </div>
    </Link>
  );
};
export default SidebarNavItem;
