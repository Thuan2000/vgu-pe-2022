import React from "react";
import { useWSChat } from "src/contexts/ws-chat.context";
import TopicDetail from "./topic-detail";
import TopicList from "./topic-list";
import TopicListHeader from "./topic-list-header";

interface IMessagesPageContentProps {}

const MessagesPageContent: React.FC<IMessagesPageContentProps> = ({
  ...props
}) => {
  const { openedTopic } = useWSChat();

  return (
    <div
      className={`grid grid-cols-3 bg-white border border-gray-20 flex-1 mb-10 rounded-lg`}
    >
      <div className={`col-span-1 border-r p-4`}>
        <TopicListHeader />
        <TopicList />
      </div>
      <div className={`col-span-2 flex-1 flex-col`}>
        {!!openedTopic && <TopicDetail />}
      </div>
    </div>
  );
};
export default MessagesPageContent;
