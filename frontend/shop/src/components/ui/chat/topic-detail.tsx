import XIcon from "@assets/icons/x-icon";
import Form from "@components/form";
import { siteSettings } from "@settings/site.settings";
import { isEmpty } from "lodash";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useWSChat } from "src/contexts/ws-chat.context";
import Input from "../storybook/input";
import Typography from "../storybook/typography";
import TopicMessageInput from "./topic-message-input";
import TopicMessages from "./topic-messages";

interface ITopicDetailProps {}

export const TopicDetail: React.FC<ITopicDetailProps> = ({}) => {
  const { t } = useTranslation();
  const { openedTopic, closeFocusTopic } = useWSChat();

  function handleXClick() {
    closeFocusTopic();
  }

  return (
    <div
      className={`relative bg-white border border-gray-20 w-96 rounded-t-sm overflow-hidden`}
    >
      <div className={`fic p-3 space-x-5 border-b border-gray-20`}>
        <div className={`relative w-10 h-10 flex-shrink-0`}>
          <Image
            src={siteSettings.companyProfileImagePlaceholder}
            layout="fill"
            alt="company-profile"
          />
        </div>
        <div>
          <Typography
            text={openedTopic!.public?.fn}
            weight="semibold"
            size="md"
          />
          {openedTopic?.online && (
            <Typography text={t("online-text")} color="primary" />
          )}
          {!openedTopic?.online && (
            <Typography text={t("last-seen-text")} color="gray-400" />
          )}
        </div>
        <div className={`!ml-auto !mr-3 cursor-pointer`}>
          <XIcon onClick={handleXClick} />
        </div>
      </div>
      <div className={`px-4 py-2 h-[250px] overflow-y-auto`}>
        <TopicMessages />
      </div>
      <TopicMessageInput />
    </div>
  );
};
