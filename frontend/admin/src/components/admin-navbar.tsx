import React from "react";

import HelpIcon from "@assets/icons/navigations/help-icon";
import NotificationIcon from "@assets/icons/notification-icon";
import ArrowLeftIcon from "@assets/icons/arrow-left-icon";

interface IAdminNavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  pageName: string;
  userName: string;
  userRole: string;
  ppHeight?: number;
  ppWidth?: number;
  userImg?: string;
  showBackArrow?: boolean;
  onBackClick: () => void;
}

const AdminNavbar: React.FC<IAdminNavbarProps> = ({
  userName,
  userRole,
  pageName,
  className,
  showBackArrow,
  onBackClick,
  ppHeight = 40,
  ppWidth = 40,
  userImg = "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/avatar-icon.svg",
  ...props
}) => {
  return (
    <div
      className={`flex items-center justify-between mt-5 px-3 md:px-0 ${className}`}
      style={{ boxSizing: "border-box" }}
      {...props}
    >
      <div className="page-info flex items-center">
        {showBackArrow && (
          <ArrowLeftIcon onClick={onBackClick} className="cursor-pointer" />
        )}
        <h2 className="font-semibold ml-3">{pageName}</h2>
      </div>
      <div className="user-info flex items-center">
        <HelpIcon className="mr-6" fill="#000" />
        <NotificationIcon className="mr-6" fill="#000" />
        <div className="flex items-center">
          <div className="mr-4 text-right hidden md:block">
            <p className="font-semibold">{userName}</p>
            <p className="font-light text-sm">{userRole}</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rounded-full"
            src={userImg}
            width={ppWidth}
            height={ppHeight}
            alt={`${userName}-prifle`}
          />
        </div>
      </div>
    </div>
  );
};
export default AdminNavbar;
