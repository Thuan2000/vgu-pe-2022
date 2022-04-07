import { useTranslation } from "next-i18next";
import React from "react";
import { useWSChat } from "src/contexts/ws-chat.context";
import Typography from "../storybook/typography";

interface ITopicListHeaderProps {}

const TopicListHeader: React.FC<ITopicListHeaderProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const { topics = {} } = useWSChat();

  const topicsLength = Object.keys(topics).length;

  return (
    <div className={`flex items-center space-x-1 pb-3`}>
      <Typography
        text={t("messages-topic-section-title")}
        weight="bold"
        size="lg"
      />
      <Typography
        text={!!topicsLength ? `(${topicsLength})` : ""}
        color="gray-30"
      />
    </div>
  );
};
export default TopicListHeader;
