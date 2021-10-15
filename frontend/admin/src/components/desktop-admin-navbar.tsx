import React, { useContext } from "react";

import HelpIcon from "@assets/icons/navigations/help-icon";
import NotificationIcon from "@assets/icons/notification-icon";
import ArrowLeftIcon from "@assets/icons/arrow-left-icon";
import { useTranslation } from "react-i18next";
import { COLORS } from "@utils/colors";
import { useRouter } from "next/dist/client/router";
import { getMeData } from "@utils/auth-utils";
import { IUser } from "@graphql/types.graphql";

interface IAdminNavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  ppHeight?: number;
  ppWidth?: number;
  userImg?: string;
  showBackArrow?: boolean;
  pageName: string;
  onBackClick: () => void;
}

const DesktopAdminNavbar: React.FC<IAdminNavbarProps> = ({
  ppHeight = 40,
  ppWidth = 40,
  onBackClick,
  showBackArrow,
  pageName,
  userImg = "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/avatar-icon.svg",
  ...props
}) => {
  const { t } = useTranslation();
  const { user } = getMeData();

  const { firstName, lastName, role } = (user as IUser) || {};
  const { pathname } = useRouter();

  const userName = `${firstName} ${lastName}`;

  return (
    <div {...props}>
      <div className={`flex items-center justify-between my-5 px-3 md:px-0`}>
        <div className="page-info flex items-center">
          {showBackArrow && (
            <ArrowLeftIcon
              onClick={onBackClick}
              className="cursor-pointer"
              fill={COLORS.BOLDER}
            />
          )}
          <h2 className="font-semibold ml-3 text-semibold">{t(pageName)}</h2>
        </div>
        <div className="user-info flex items-center">
          <HelpIcon className="mr-6" fill={COLORS.BOLDER} />
          <NotificationIcon className="mr-6" fill={COLORS.BOLDER} />
          <div className="flex items-center">
            <div className="mr-4 text-right hidden md:block">
              <p className="font-semibold text-semibold">{userName}</p>
              <p className="text-sm text-gray-400">{t(role as string)}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="rounded-full"
              src={userImg}
              width={ppWidth}
              height={ppHeight}
              alt={`${userName}-profile`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DesktopAdminNavbar;
