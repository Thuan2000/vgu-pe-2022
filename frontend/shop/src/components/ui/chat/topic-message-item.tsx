import { TDataResp } from "@utils/chat-interface";
import { generateUUID, getLoggedInCompany } from "@utils/functions";
import React, { useEffect, useRef } from "react";
import Typography from "../storybook/typography";

interface ITopicMessageItemProps {
  msg: TDataResp;
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

  return (
    <div
      id={id}
      className={`p-4 my-2 w-[200px] ${
        isSent && "justify-end ml-auto rounded-l-2xl rounded-br-2xl bg-blue"
      }`}
    >
      <Typography
        align={isSent ? "right" : "left"}
        color={isSent ? "white" : "black"}
        text={msg.content}
      />
    </div>
  );
};
export default TopicMessageItem;
