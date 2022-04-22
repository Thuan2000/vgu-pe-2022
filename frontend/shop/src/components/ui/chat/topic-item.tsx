import { siteSettings } from "@settings/site.settings";
import {
  getChatTime,
  getFileMsg,
  getTopicLastMessage,
} from "@utils/chat-functions";
import { TTopic } from "@utils/chat-interface";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { useWSChat } from "src/contexts/ws-chat.context";
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
  const lastMessage = getTopicLastMessage(topic);

  function handleClick() {
    setFocusTopic(topicId);
  }

  function getFormattedLastMessage() {
    const content = lastMessage?.content;
    if (!content) return "";
    if (typeof content === "object") {
      return t(
        getFileMsg(content).mime.includes("image")
          ? "sent-image-text"
          : "sent-file-text"
      );
    } else return content;
  }

  return (
    <div
      className={`fic justify-between w-full pr-4 cursor-pointer `}
      onClick={handleClick}
    >
      <div className={`fic p-3 relative overflow-hidden space-x-3`}>
        <div className={`relative w-10 h-10 flex-shrink-0`}>
          <Image
            src={
              topic.public.photo?.ref ||
              siteSettings.companyProfileImagePlaceholder
            }
            layout="fill"
            alt={topicUserName}
          />
        </div>
        <div>
          <Typography text={topicUserName} weight="semibold" align="left" />
          <div className={`fic space-x-1`}>
            {!!lastMessage && (
              <Typography text={getFormattedLastMessage()} color="gray-400" />
            )}
          </div>
        </div>
      </div>
      <div className={`flex-shrink-0`}>
        {lastMessage?.ts && (
          <Typography text={getChatTime(lastMessage.ts)} weight="bold" />
        )}
      </div>
    </div>
  );
};
