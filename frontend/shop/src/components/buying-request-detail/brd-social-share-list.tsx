import React from "react";
import FacebookIcon from "@assets/icons/socials/facebook-icon";
import MessangerIcon from "@assets/icons/socials/messanger-icon";
import TelegramIcon from "@assets/icons/socials/telegram-icon";
import ZaloIcon from "@assets/icons/socials/zalo-icon";
import LinkIcon from "@assets/icons/socials/link-icon";

interface ISocialShareListProps {}

const BRDSocialShareList: React.FC<ISocialShareListProps> = () => {
  const size = 7;
  const sIconClassName = `w-${size} h-${size} cursor-pointer`;

  const SOCIAL_SHARE_LINK = {
    TELEGRAM: "https://t.me/share/url?url=",
  };

  return (
    <div className="fic space-x-2">
      <FacebookIcon className={sIconClassName} />
      <MessangerIcon className={sIconClassName} />
      <a
        rel="noreferrer"
        target="_blank"
        href={`${SOCIAL_SHARE_LINK.TELEGRAM}`}
      >
        <TelegramIcon className={sIconClassName} />
      </a>
      {/* <ZaloIcon className={sIconClassName} /> */}
      <LinkIcon className={sIconClassName} />
    </div>
  );
};
export default BRDSocialShareList;
