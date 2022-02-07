import MessageIcon from "@assets/icons/message-icon";
import { chatGetSubsMessage } from "@utils/chat-utils";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import { useWSChat } from "src/contexts/ws-chat.context";
import { useOutsideClickRef } from "src/hooks/useOutsideClickRef";
import Link from "../link";
import Button from "../storybook/button";
import Typography from "../storybook/typography";
import ChatMessageItem from "./chat-message-item";

interface INewChatProps {}

const NewChat: React.FC<INewChatProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const {
    companyChatId,
    wsChatInstance,
    isReady,
    unreadedMessages = {},
  } = useWSChat() || {};

  const ref = useOutsideClickRef(hideMessages);
  const [isShowMessages, setIsShowMessages] = useState(false);
  const messages = Object.keys(unreadedMessages).filter(
    (m) => !unreadedMessages[m].isReaded
  );

  useEffect(() => {
    function getNews() {
      if (!companyChatId || !isReady) return;
      wsChatInstance?.send(chatGetSubsMessage());
    }

    getNews();
  }, [isReady, companyChatId, wsChatInstance]);

  function toggleMessages() {
    if (isShowMessages) hideMessages();
    if (!isShowMessages) showMessages();
  }

  function hideMessages() {
    setIsShowMessages(false);
  }

  function showMessages() {
    setIsShowMessages(true);
  }
  return (
    <div className={`relative !h-fit-content translate-y-1`} ref={ref}>
      <Button
        onClick={toggleMessages}
        variant="custom"
        className={`!w-fit-content !h-fit-content !p-0`}
      >
        <MessageIcon className={`w-7 h-7`} />
        {!!messages.length && (
          <div
            className={`absolute w-4 h-4 rounded-full bg-primary flex-center text-white font-semibold top-0 right-0 text-[7pt] translate-x-1/2 -translate-y-1/3`}
          >
            {messages.length}
          </div>
        )}
      </Button>

      {!!isShowMessages && (
        <div
          className={`absolute bg-white border rounded-sm top-full -left-14 w-[400px] space-y-0`}
        >
          {/* Header */}
          <div className={`border-b fic space-x-2 px-3 py-2`}>
            <Typography text={t("messages-label")} weight="bold" size="lg" />
            <Typography
              size="sm"
              text={`(${messages.length || 0} ${t(
                messages.length <= 1
                  ? "unread-singular-label"
                  : "unread-plural-label"
              )})`}
            />
          </div>

          {messages.flatMap((key, idx) => {
            const m = unreadedMessages[key];

            return (
              <ChatMessageItem
                key={m.from}
                message={m}
                isLast={idx === messages.length - 1}
              />
            );
          })}

          {!messages.length && (
            <div className={`py-5`}>
              <Typography
                text={t("no-new-message-text")}
                size="lg"
                weight="bold"
                color="gray"
                align="center"
              />
            </div>
          )}

          {/* Footer */}
          <Link href={ROUTES.CHAT_URL!} target="_blank">
            <div className={`border-t py-3`}>
              <Typography
                text={t("open-chat-text")}
                align="center"
                weight="semibold"
                size="md"
                color="gray"
              />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};
export default NewChat;
