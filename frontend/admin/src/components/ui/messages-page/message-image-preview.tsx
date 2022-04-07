import { IFile } from "@graphql/types.graphql";
import { getFileMsg } from "@utils/chat-functions";
import { AttachmentMsg, TChatDataResp } from "@utils/chat-interface";
import Image from "next/image";
import React from "react";
import { useModal } from "src/contexts/modal.context";
import ImagePreview from "../image-preview";

interface IMessageImagePreviewProps {
  msg: TChatDataResp;
}

const MessageImagePreview: React.FC<IMessageImagePreviewProps> = ({
  msg,
  ...props
}) => {
  const { content } = msg;
  const fileMsg = getFileMsg(content as AttachmentMsg);

  const { openModal } = useModal();

  function handleImgClick() {
    const image: IFile = {
      url: fileMsg.val,
      location: fileMsg.val,
      fileName: fileMsg.name,
      fileType: fileMsg.mime,
    };
    openModal(
      (
        <ImagePreview
          defaultActiveUrl={image.url}
          images={[image]}
          isOriginalSize
          isWithThumb={false}
        />
      ) as any
    );
  }

  return (
    <>
      <div
        className={`relative w-40 h-40 cursor-pointer`}
        onClick={handleImgClick}
      >
        <Image src={fileMsg.val} layout="fill" alt={fileMsg.name} />
      </div>
    </>
  );
};
export default MessageImagePreview;
