import { getChatTime, getFileMsg } from "@utils/chat-functions";
import { AttachmentMsg, TChatDataResp } from "@utils/chat-interface";
import { generateUUID, getLoggedInCompany } from "@utils/functions";
import Image from "next/image";
import React, { useEffect } from "react";
import Typography from "../storybook/typography";
import MessageDocumentPreview from "./message-document-preview";
import MessageImagePreview from "./message-image-preview";

interface ITopicMessageItemProps {
  msg: TChatDataResp;
  isLast: boolean;
}

const TopicMessageItem: React.FC<ITopicMessageItemProps> = ({
  msg,
  isLast,
  ...props
}) => {
  const loggedCompChatId = getLoggedInCompany()?.chatId;
  const id = generateUUID();

  const isSent = loggedCompChatId === msg.from;
  useEffect(() => {
    const el = document.getElementById(id);
    if (isLast && el) {
      el.scrollIntoView();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fileMsg = getFileMsg(msg.content as AttachmentMsg);

  return (
    <div
      id={id}
      className={`p-2 pb-1 my-2 w-[200px] ${
        isSent && "justify-end ml-auto rounded-l-2xl rounded-br-2xl bg-blue"
      }`}
    >
      {typeof msg.content === "object" ? (
        <div className={`space-y-2`}>
          <div className={`flex-center`}>
            {fileMsg.mime.includes("image") ? (
              <MessageImagePreview msg={msg} />
            ) : (
              <MessageDocumentPreview msg={msg} />
            )}
          </div>

          <Typography
            color={isSent ? "white" : "black"}
            truncate
            text={(msg.content as AttachmentMsg).txt || fileMsg.name}
          />
        </div>
      ) : (
        <Typography
          align={isSent ? "right" : "left"}
          color={isSent ? "white" : "black"}
          text={msg.content}
        />
      )}

      <Typography
        text={getChatTime(msg.ts)}
        color={isSent ? "white" : "gray"}
        align={isSent ? "right" : "left"}
        size="xs"
        className={`pt-1`}
      />
    </div>
  );
};
export default TopicMessageItem;
