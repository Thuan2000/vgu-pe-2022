import AttachmentIcon from "@assets/icons/attachment-icon";
import FilePreviewIcon from "@assets/icons/file-preview-icon";
import XIcon from "@assets/icons/x-icon";
import { formatByte } from "@utils/functions";
import { useTranslation } from "next-i18next";
import React from "react";
import Typography from "../storybook/typography";
import { IFileWUrl } from "./topic-message-input";

interface ITopicMessageAttachmentPreviewProps {
  file?: IFileWUrl;
  onRemoveAttachment: () => void;
}

const TopicMessageAttachmentPreview: React.FC<
  ITopicMessageAttachmentPreviewProps
> = ({ file, onRemoveAttachment }) => {
  const { t } = useTranslation();

  if (!file) return <></>;

  return (
    <div className={` bg-gray-20 p-2 px-4 flex justify-between fic`}>
      <div className={`relative fic space-x-2`}>
        <FilePreviewIcon
          onClick={() => window.open(file.url)}
          className={`w-10 h-10 cursor-pointer`}
        />
        <div className={`max-w-[250px]`}>
          <FileDetailQA question={t("name-text")} answer={file?.name} />
          <FileDetailQA question={t("content-type-text")} answer={file?.type} />
          <FileDetailQA
            question={t("file-size-text")}
            answer={formatByte(file.size)}
          />
        </div>
      </div>
      <div className={`!mr-2 cursor-pointer`}>
        <XIcon onClick={onRemoveAttachment} />
      </div>
    </div>
  );
};

export default TopicMessageAttachmentPreview;

function FileDetailQA({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className={`fic space-x-1`}>
      <Typography
        weight="semibold"
        text={`${question}:`}
        className={`flex-shrink-0`}
      />
      <Typography text={answer} truncate size="xs" />
    </div>
  );
}
