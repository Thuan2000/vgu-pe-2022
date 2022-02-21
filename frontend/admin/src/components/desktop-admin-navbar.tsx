import React from "react";

import NotificationIcon from "@assets/icons/notification-icon";
import { useTranslation } from "react-i18next";
import { COLORS } from "@utils/colors";
import Breadcrumb from "./breadcrumb";
import { ROUTES } from "@utils/routes";
import NewChat from "./ui/chat-button/new-chat";
import UserProfile from "./user-profile";

interface IAdminNavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  ppHeight?: number;
  ppWidth?: number;
  userImg?: string;
  showBackArrow?: boolean;
  pageName: string;
  onBackClick: () => void;
  userRole: string;
  userName: string;
}

const DesktopAdminNavbar: React.FC<IAdminNavbarProps> = ({
  ppHeight = 40,
  ppWidth = 40,
  onBackClick,
  showBackArrow,
  userName,
  userRole,
  pageName,
  userImg = "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/avatar-icon.svg",
  ...props
}) => {
  const { t } = useTranslation("form");
  return (
    <div {...props}>
      <div className={`flex items-center justify-between my-5 px-3 md:px-0`}>
        <div className={`flex flex-col items-start`}>
          <Breadcrumb homeHref={ROUTES.HOMEPAGE} />
          <div className="page-info flex items-center">
            {/* {showBackArrow && (
              <ArrowLeftIcon
                onClick={onBackClick}
                className="cursor-pointer"
                fill={COLORS.BOLDER}
              />
            )} */}
            <h2 className="font-semibold ml-3 text-semibold">{pageName}</h2>
          </div>
        </div>
        <div className="user-info flex items-center space-x-5">
          {/* TODO: Re-enable when the help content is ready */}
          {/* <HelpIcon fill={COLORS.BOLDER} /> */}
          <NewChat />
          <div className="flex items-center">
            <div className="mr-4 text-right hidden md:block">
              <p className="font-semibold text-semibold">{userName}</p>
              <p className="text-sm text-gray-400">{t(userRole)}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <UserProfile userImg={userImg} userName={userName} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DesktopAdminNavbar;
