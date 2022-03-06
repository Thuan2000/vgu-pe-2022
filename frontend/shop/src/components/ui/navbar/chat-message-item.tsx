import { ROUTES } from "@utils/routes";
import React from "react";
import Link from "../link";
import Typography from "../storybook/typography";
import ReactTimeAgo from "react-time-ago";
import { useRouter } from "next/router";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import { IChatSubPublic } from "@utils/interfaces";
import { trimText } from "@utils/functions";

interface IChatMessageItemProps {
  message: IChatSubPublic;
  isLast: boolean;
  onClick: () => void;
}

const ChatMessageItem: React.FC<IChatMessageItemProps> = ({
  message,
  isLast,
  onClick,
}) => {
  const { from, lastMessage, fn, ts } = message;
  const { locale } = useRouter();

  return (
    <Link
      onClick={onClick}
      href={`${ROUTES.CHAT_URL}/#/${from}`}
      target="_blank"
    >
      <div
        className={`fic !px-3 !py-3 relative overflow-hidden space-x-3 border-b 
        ${isLast && "border-b-0"}
      `}
      >
        <div className={`relative w-10 h-10`}>
          <Image
            src={siteSettings.companyProfileImagePlaceholder}
            layout="fill"
            alt="company-profile"
          />
        </div>
        <div>
          <div className="grid grid-cols-3 gap-x-2">
            <Typography
              text={trimText(fn, 20)}
              weight="bold"
              truncate
              className={`text-md col-span-2`}
            />
            <ReactTimeAgo
              className={`text-gray justify-end text-xs col-span-1 truncate`}
              date={ts || new Date().getTime()}
              locale={locale}
            />
          </div>
          <Typography
            color="primary"
            truncate
            text={lastMessage}
            weight="normal"
            className={`min-w-full w-[320px]`}
          />
        </div>
      </div>
    </Link>
  );
};

export default ChatMessageItem;
