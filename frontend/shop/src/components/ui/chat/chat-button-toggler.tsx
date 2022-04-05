import ChevronRightIcon from "@assets/icons/chevron-right-icon";
import MessageIcon from "@assets/icons/message-icon";
import { useTranslation } from "next-i18next";
import React from "react";
import Button from "../storybook/button";
import Typography from "../storybook/typography";

interface IChatButtonTogglerProps {
  toggleMessages: () => void;
  unreadTopicsLength: number;
}

export const ChatButtonToggler: React.FC<IChatButtonTogglerProps> = ({
  toggleMessages,
  unreadTopicsLength,
}) => {
  const { t } = useTranslation();

  return (
    <div
      onClick={toggleMessages}
      className={`fic w-full border-b cursor-pointer border-gray-20 !h-fit-content !p-5 bg-white`}
    >
      <div className="fic space-x-1">
        <Typography
          text={`${t("chat-message-title")}`}
          weight="bold"
          size="md"
        />
        <Typography
          size="md"
          color="gray-400"
          weight="light"
          text={!!unreadTopicsLength ? `(${unreadTopicsLength})` : ""}
        />
      </div>

      <div className="ml-auto mr-2">
        <ChevronRightIcon />
      </div>
    </div>
  );
};
