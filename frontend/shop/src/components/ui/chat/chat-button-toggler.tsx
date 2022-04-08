import ChevronRightIcon from "@assets/icons/chevron-right-icon";
import { fromoRotationAnimation } from "@utils/fromo-animations";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import React from "react";
import Typography from "../storybook/typography";

interface IChatButtonTogglerProps {
  toggleMessages: () => void;
  unreadTopicsLength: number;
  isShowMessages: boolean;
}

export const ChatButtonToggler: React.FC<IChatButtonTogglerProps> = ({
  toggleMessages,
  isShowMessages,
  unreadTopicsLength,
}) => {
  const { t } = useTranslation();

  function getRotation() {
    return isShowMessages ? "90deg" : "0deg";
  }

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

      <motion.div
        {...fromoRotationAnimation(getRotation())}
        className="ml-auto mr-2"
      >
        <ChevronRightIcon />
      </motion.div>
    </div>
  );
};
