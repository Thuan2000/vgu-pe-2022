import { siteSettings } from "@settings/site.settings";
import React from "react";
import { TTopic, useWSChat } from "src/contexts/ws-chat.context";
import Typography from "../storybook/typography";
import Image from "next/image";
import {
  getChatTime,
  getFileMsg,
  getTopicLastMessage,
} from "@utils/chat-functions";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

interface ITopicListItemProps {
  tpc: TTopic;
}

const TopicListItem: React.FC<ITopicListItemProps> = ({ tpc, ...props }) => {
  const topicName = tpc.public?.fn;
  const { t } = useTranslation();
  const { setFocusTopic } = useWSChat();
  const lastMessage = getTopicLastMessage(tpc);

  function handleClick() {
    setFocusTopic(tpc.topic);
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
      className={`fic py-4 pr-3 space-x-3 cursor-pointer`}
      onClick={handleClick}
    >
      <div className={`relative w-13 h-13`}>
        <Image
          src={siteSettings.companyProfileImagePlaceholder}
          alt={topicName}
        />
      </div>
      <div className={`w-full`}>
        <Typography text={topicName} weight="bold" />
        {lastMessage?.ts && (
          <Typography text={getFormattedLastMessage()} color="gray-400" />
        )}
      </div>
      <div className={`flex-shrink-0`}>
        {lastMessage?.ts && (
          <Typography
            className={`flex-shrink-0`}
            text={getChatTime(lastMessage.ts)}
            weight="bold"
          />
        )}
      </div>
    </div>
  );
};
export default TopicListItem;
