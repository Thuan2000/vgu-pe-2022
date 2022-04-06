import FilePreviewIcon from "@assets/icons/files/file-preview-icon";
import PdfIcon from "@assets/icons/files/pdf-icon";
import { TChatDataResp } from "@utils/chat-interface";
import { COLORS } from "@utils/colors";
import { generateUUID, getLoggedInCompany } from "@utils/functions";
import React, { useEffect } from "react";
import Typography from "../storybook/typography";

interface ITopicMessageItemProps {
  msg: TChatDataResp;
  isLast: boolean;
}

export type ChatAttachmentRecv = {
  mime: string;
  name: string;
  val: string;
};

export type AttachmentMsg = {
  ent: [{ data: ChatAttachmentRecv }];
  txt?: string;
};

function getFileMsg(file: AttachmentMsg) {
  return file.ent[0].data;
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
      {typeof msg.content === "object" ? (
        <div className={`space-y-2`}>
          <div className={`flex-center`}>
            <FilePreviewIcon
              className={`w-20 h-20 cursor-pointer`}
              fill={COLORS.WHITE}
              onClick={() =>
                window.open(getFileMsg(msg.content as AttachmentMsg).val)
              }
            />
          </div>
          <Typography
            color={isSent ? "white" : "black"}
            truncate
            text={
              msg.content.txt || getFileMsg(msg.content as AttachmentMsg).name
            }
          />
        </div>
      ) : (
        <Typography
          align={isSent ? "right" : "left"}
          color={isSent ? "white" : "black"}
          text={msg.content}
        />
      )}
    </div>
  );
};
export default TopicMessageItem;
