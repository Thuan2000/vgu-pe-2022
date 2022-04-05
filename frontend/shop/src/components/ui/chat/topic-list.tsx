import { TopicItem } from "./topic-item";
import { useTranslation } from "next-i18next";
import React from "react";
import { useWSChat } from "src/contexts/ws-chat.context";
import Typography from "../storybook/typography";

interface IChatTopicListProps {}

const ChatTopicList: React.FC<IChatTopicListProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const { topics } = useWSChat();

  return (
    <div className={`bg-white space-y-0 h-fit-content`}>
      {topics.map((tpc, idx) => {
        return (
          <TopicItem
            isLast={topics.length === idx + 1}
            topic={tpc}
            key={tpc.public?.fn + "topic-item"}
          />
        );
      })}

      {!topics.length && (
        <div className={`py-5`}>
          <Typography
            text={t("please-chat-to-a-company-message")}
            size="xs"
            weight="bold"
            color="gray"
            align="center"
          />
        </div>
      )}
    </div>
  );
};
export default ChatTopicList;
