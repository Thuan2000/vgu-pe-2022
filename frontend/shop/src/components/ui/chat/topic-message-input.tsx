import AttachmentIcon from "@assets/icons/attachment-icon";
import ImageIcon from "@assets/icons/image-icon";
import SendMessageIcon from "@assets/icons/send-message-icon";
import Form from "@components/form";
import { useUploadFilesMutation } from "@graphql/upload.graphql";
import { TChatFileParam } from "@utils/chat-interface";
import { COLORS } from "@utils/colors";
import { formatByte, getCompanyName } from "@utils/functions";
import { useTranslation } from "next-i18next";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useWSChat } from "src/contexts/ws-chat.context";
import Input from "../storybook/input";
import TextArea from "../storybook/inputs/text-area";
import Typography from "../storybook/typography";
import TopicMessageAttachmentPreview from "./topic-message-attachment-preview";

interface ITopicMessageInputProps {}

export interface IFileWUrl extends File {
  url: string;
}

type TAttachmentType = "" | "file" | "image";

const TopicMessageInput: React.FC<ITopicMessageInputProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { openedTopic, notifyTyping, sendChatMessage, sendAttachment } =
    useWSChat();

  const [newMessage, setNewMessage] = useState("");
  const [isNotified, setIsNotified] = useState(false);
  const isNotifiedTimeout = useRef<any>(null);
  const [uploadFile] = useUploadFilesMutation();
  const [file, setFile] = useState<IFileWUrl>();
  const attachmentType = useRef<TAttachmentType>("");

  const {
    getInputProps: getAttachmentInputProps,
    getRootProps: getAttachmentRootProps,
  } = useDropzone({
    onDrop: handleAttachmentDrop,
  });

  useEffect(() => {
    isNotifiedTimeout.current = setTimeout(() => setIsNotified(false), 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotified]);

  async function handleSendWithAttachment() {
    if (!file) return;

    const { data } = await uploadFile({
      variables: {
        input: {
          companyName: openedTopic?.topic!,
          files: [file],
          uploadsFileInputType: file.type.split("/")[0] as any,
          fileAccessControl: "PUBLIC_READ" as any,
        },
      },
    });

    const attachment: TChatFileParam = {
      mime: file.type,
      name: file.name,
      val: data?.uploadFiles[0].url!,
    };

    sendAttachment(openedTopic?.topic!, newMessage, attachment);
  }

  async function handleAttachmentDrop(files: File[]) {
    const file = files[0];
    const url = URL.createObjectURL(file);
    setFile(Object.assign(file, { url }));
    (inputRef.current as any)?.focus();
  }

  function sendTypingNotification() {
    if (isNotified) return;
    notifyTyping(openedTopic?.topic!);
    setIsNotified(true);
  }

  function handleSubmit() {
    if (!newMessage && !file) return;
    if (file && attachmentType.current === "file") {
      handleSendWithAttachment();
    } else sendChatMessage(openedTopic?.topic!, newMessage);

    removeFile();
    setNewMessage("");
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewMessage(e.target.value);
    if (!!e.target.value) {
      sendTypingNotification();
    }
  }

  function handleAttachmentIconClick() {
    attachmentType.current = "file";
  }

  function removeFile() {
    if (!file) return;
    setFile(undefined);
  }

  function handleRemoveAttachment() {
    removeFile();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TopicMessageAttachmentPreview
        onRemoveAttachment={handleRemoveAttachment}
        file={file}
      />
      <div className={`p-4 bg-gray-10 fic space-x-4`}>
        <div className={`fic space-x-2`}>
          <div
            {...getAttachmentRootProps({
              className: "cursor-pointer",
              onClick: handleAttachmentIconClick,
            })}
          >
            <AttachmentIcon />
            <input {...getAttachmentInputProps()} />
          </div>
          {/* <ImageIcon /> */}
        </div>
        <Input
          autoFocus
          ref={inputRef}
          // rows={1}
          onChange={handleInputChange}
          value={newMessage}
          className={`w-full`}
          inputClassName={`!pr-10`}
          style={{ resize: "none" }}
          suffix={
            <SendMessageIcon
              onClick={handleSubmit}
              className={`cursor-pointer`}
              fill={((!!newMessage || !!file) && COLORS.PRIMARY.DEFAULT) || ""}
            />
          }
        />

        {/* <SendMessageIcon
          onClick={handleSubmit}
          className={`cursor-pointer w-6 h-6`}
          fill={((!!newMessage || !!file) && COLORS.PRIMARY.DEFAULT) || ""}
        /> */}
      </div>
    </Form>
  );
};

export default TopicMessageInput;
