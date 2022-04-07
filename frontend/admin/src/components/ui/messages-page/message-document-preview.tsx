import FilePreviewIcon from "@assets/icons/file-preview-icon";
import { getFileMsg } from "@utils/chat-functions";
import { AttachmentMsg, TChatDataResp } from "@utils/chat-interface";
import { COLORS } from "@utils/colors";
import { getLoggedInCompany } from "@utils/functions";
import React from "react";
import Typography from "../storybook/typography";

interface IMessageDocumentPreviewProps {
  msg: TChatDataResp;
}

const MessageDocumentPreview: React.FC<IMessageDocumentPreviewProps> = ({
  msg,
  ...props
}) => {
  const { from, content } = msg;
  const isSent = from === getLoggedInCompany()?.chatId;

  const fileMsg = getFileMsg(content as AttachmentMsg);
  return (
    <>
      <FilePreviewIcon
        className={`w-20 h-20 cursor-pointer`}
        fill={isSent ? COLORS.WHITE : COLORS.DARK_BLUE}
        onClick={() => window.open(fileMsg.val)}
      />
    </>
  );
};
export default MessageDocumentPreview;
