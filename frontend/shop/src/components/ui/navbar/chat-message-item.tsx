import { ROUTES } from "@utils/routes";
import React from "react";
import Link from "../link";
import Typography from "../storybook/typography";
import ReactTimeAgo from "react-time-ago";
import { useRouter } from "next/router";
import Image from "next/image";
import { siteSettings } from "@settings/site.settings";
import { IChatSubPublic } from "@utils/interfaces";
import { useTranslation } from "next-i18next";

interface IChatMessageItemProps {
  message: IChatSubPublic;
  isLast: boolean;
  onClick: () => void;
}

function getSentAMessageByMime(mime: string) {
  if (mime.includes("application")) return "sent-an-file-message";
  if (mime.includes("image")) return "sent-an-image-message";
  if (mime.includes("video")) return "sent-an-video-message";
}

const ChatMessageItem: React.FC<IChatMessageItemProps> = ({
  message,
  isLast,
  onClick,
}) => {
  const { t } = useTranslation();
  let { from, lastMessage, fn, ts } = message;
  const { locale } = useRouter();
  if (typeof lastMessage === "object") {
    lastMessage = t(
      getSentAMessageByMime((lastMessage as any).ent?.[0].data.mime) as any
    );
  }

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
          <div className="flex space-x-2">
            <Typography
              // text={trimText(fn, 30)}
              text={fn}
              weight="bold"
              truncate
              size="xs"
              className={`col-span-2 w-[250px]`}
            />
            <ReactTimeAgo
              className={`text-gray justify-end text-[8pt] w-fit-content col-span-1 truncate flex-center`}
              date={new Date(ts)}
              locale={locale}
            />
          </div>
          <Typography
            color="primary"
            truncate
            text={lastMessage}
            weight="normal"
            className={`text-[10pt] min-w-full w-[250px]`}
          />
        </div>
      </div>
    </Link>
  );
};

export default ChatMessageItem;
