import React from "react";
import { useTranslation } from "react-i18next";

import { useWSChat } from "src/contexts/ws-chat.context";
import Loader from "../storybook/loader/loader";
import TopicListItem from "./topic-list-item";

interface ITopicListProps {}

const TopicList: React.FC<ITopicListProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const { topics: topicsObj = {} } = useWSChat();

  const topics = Object.keys(topicsObj).map((k) => topicsObj[k]);

  if (!topics.length) {
    return (
      <div className={`h-full flex-center`}>
        <Loader simple className="w-10 h-10" />
      </div>
    );
  }

  return (
    <div>
      {topics.map((tpc) => {
        return <TopicListItem key={tpc.public.fn + "topic-list"} tpc={tpc} />;
      })}
    </div>
  );
};
export default TopicList;
