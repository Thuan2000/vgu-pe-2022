import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import { TTopic, useWSChat } from "src/contexts/ws-chat.context";
import locale from "yup/lib/locale";
import Button from "../storybook/button";
import Typography from "../storybook/typography";

interface ITopicItemProps {
  topic: TTopic;
  isLast: boolean;
}

export const TopicItem: React.FC<ITopicItemProps> = ({ topic, isLast }) => {
  const { t } = useTranslation();

  const { setFocusTopic } = useWSChat();

  const topicUserName = topic.public?.fn;
  const isOnline = topic.online;
  const lastSeen = topic.seen?.when;
  const topicId = topic.topic;
  function handleClick() {
    setFocusTopic(topicId);
  }
  return (
    <div
      className={`fic !px-3 cursor-pointer !py-3 !min-w-[384px] relative overflow-hidden space-x-3 !h-fit-content !justify-start`}
      onClick={handleClick}
    >
      <div className={`relative w-10 h-10 flex-shrink-0`}>
        <Image
          src={siteSettings.companyProfileImagePlaceholder}
          layout="fill"
          alt="company-profile"
        />
      </div>
      <div>
        <Typography text={topicUserName} weight="semibold" align="left" />
        {isOnline && (
          <Typography
            text={t("user-is-online-text")}
            align="left"
            color="primary"
            weight="semibold"
          />
        )}
        {!isOnline && !!lastSeen && (
          <div className={`fic space-x-1`}>
            <Typography
              align="left"
              text={`${t("last-seen-text")}`}
              color="gray-400"
            />
            {/* <ReactTimeAgo
              locale={locale}
              className={`text-sm text-gray-400`}
              date={new Date(lastSeen)}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};
