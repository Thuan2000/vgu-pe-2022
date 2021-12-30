import PostRequestAnimationIcon from "@assets/icons/post-request-animation-icon";
import Link from "@components/ui/link";
import Button from "@components/ui/storybook/button";
import { ROUTES } from "@utils/routes";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface IHomepageReviewProps {
  label: string;
  userImg?: string;
  ppHeight?: number;
  ppWidth?: number;
  userRole: string;
  userName: string;
  userEmail: string;
  
}

const HomepageReview: React.FC<IHomepageReviewProps> = ({
  label,
  userName,
  userRole,
  userEmail,
  ppHeight = 120,
  ppWidth = 120,
  userImg = "https://sdconnect-assets.s3.ap-southeast-1.amazonaws.com/avatar-icon.svg",
}) => {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="border border-gray-100 rounded-sm justify-between p-4 cursor-pointer">
      <div className="grid grid-cols-3">
        <img
          className="rounded-full"
          src={userImg}
          width={ppWidth}
          height={ppHeight}
          alt={`${userName}-profile`}
        />
        <div className="mr-4 text-left hidden md:block col-span-2">
          <p className="font-semibold text-semibold text-2xl">{userName}</p>
          <p className="text-sm text-gray-400 my-2">{userRole}</p>
          <p className="text-base mb-2">{userEmail}</p>
          <Link
            href={ROUTES.LOGOUT}
          >
            <Button
              variant="cancel"
              size="small"
              className="md:w-1/2.5"
            >
              {t("logout-button")}
            </Button>
          </Link>
          <Link
            href={ROUTES.SETTINGS}
          >
            <Button

              size="small"
              className="md:w-1/2.5 ml-2"
            >
              {t("setting-button")}
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};
export default HomepageReview;
