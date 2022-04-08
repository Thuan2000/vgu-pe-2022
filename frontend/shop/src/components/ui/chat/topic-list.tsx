import { TopicItem } from "./topic-item";
import { useTranslation } from "next-i18next";
import React from "react";
import { useWSChat } from "src/contexts/ws-chat.context";
import Typography from "../storybook/typography";

interface IChatTopicListProps {}

const ChatTopicList: React.FC<IChatTopicListProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const { topics = {} } = useWSChat();
  return (
    <div className={`bg-white space-y-0 h-fit-content w-full`}>
      {Object.keys(topics).map((key, idx) => {
        const tpc = topics[key];
        return (
          <TopicItem
            isLast={Object.keys(topics).length === idx + 1}
            topic={tpc}
            key={tpc.public?.fn + "topic-item"}
          />
        );
      })}

      {!Object.keys(topics).length && (
        <div className={`py-5 w-full bg-white`}>
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
