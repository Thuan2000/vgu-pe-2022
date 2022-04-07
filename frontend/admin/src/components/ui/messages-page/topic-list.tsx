import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useWSChat } from "src/contexts/ws-chat.context";
import Loader from "../storybook/loader/loader";
import Typography from "../storybook/typography";
import TopicListItem from "./topic-list-item";

interface ITopicListProps {}

const TopicList: React.FC<ITopicListProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const { topics: topicsObj = {} } = useWSChat();
  const [loading, setLoading] = useState(true);

  const topics = Object.keys(topicsObj).map((k) => topicsObj[k]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className={`h-full flex-center`}>
        <Loader simple className="w-10 h-10" />
      </div>
    );
  }

  return (
    <div>
      {!!topics.length &&
        topics.map((tpc) => {
          return <TopicListItem key={tpc.public.fn + "topic-list"} tpc={tpc} />;
        })}

      {!topics.length && (
        <div className={`h-full flex-center`}>
          <Typography text={t("no-topic-yet")} />
        </div>
      )}
    </div>
  );
};
export default TopicList;
