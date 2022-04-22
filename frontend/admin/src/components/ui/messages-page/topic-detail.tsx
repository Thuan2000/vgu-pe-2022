import { siteSettings } from "@settings/site.settings";
import React from "react";
import { useWSChat } from "src/contexts/ws-chat.context";
import Image from "next/image";
import Typography from "../storybook/typography";
import { useTranslation } from "react-i18next";
import TopicMessages from "./topic-messages";
import TopicMessageInput from "./topic-message-input";

interface ITopicDetailProps {}

const TopicDetail: React.FC<ITopicDetailProps> = ({ ...props }) => {
  const { openedTopic } = useWSChat();
  const { t } = useTranslation();

  return (
    <>
      {/* Header */}
      <div className={`fic space-x-2 p-2 pb-4 px-4 border-b`}>
        <div className={`relative w-13 h-13`}>
          <Image
            src={
              openedTopic?.public.photo?.ref ||
              siteSettings.companyProfileImagePlaceholder
            }
            layout="fill"
            alt={openedTopic?.public.fn}
          />
        </div>
        <div>
          <Typography size="md" weight="bold" text={openedTopic?.public.fn!} />
          {openedTopic?.online && (
            <Typography
              text={t("online-text")}
              color="primary"
              weight="semibold"
            />
          )}
          {!!openedTopic?.seen && (
            <Typography text={t("last-seen-text")} color="gray" />
          )}
        </div>
      </div>

      {/* Messages */}
      <div className={`flex-col flex-1 relative`}>
        <TopicMessages />
        <div className={`absolute bottom-0 left-0 right-0`}>
          <TopicMessageInput />
        </div>
      </div>
    </>
  );
};
export default TopicDetail;
