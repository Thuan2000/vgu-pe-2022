import { isEmpty } from "lodash";
import { useTranslation } from "next-i18next";
import React from "react";
import { useWSChat } from "src/contexts/ws-chat.context";
import Typography from "../storybook/typography";
import TopicMessageItem from "./topic-message-item";

interface ITopicMessagesProps {}

const TopicMessages: React.FC<ITopicMessagesProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const { openedTopic } = useWSChat();

  const messageKeys = Object.keys(openedTopic?.messages || {});

  const messages = messageKeys.map((k, idx) => {
    const isLast = messageKeys.length === idx + 1;
    const msg = (openedTopic?.messages as any)[k];
    return (
      <TopicMessageItem
        isLast={isLast}
        key={msg.topic + msg.seq + "message"}
        msg={msg}
      />
    );
  });

  return (
    <div className={`flex flex-col`}>
      {isEmpty(openedTopic!.messages) ? (
        <Typography text={t("no-message-yet-text")} />
      ) : (
        messages
      )}
    </div>
  );
};
export default TopicMessages;
