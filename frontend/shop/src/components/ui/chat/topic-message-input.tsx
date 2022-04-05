import AttachmentIcon from "@assets/icons/attachment-icon";
import ImageIcon from "@assets/icons/image-icon";
import SendMessageIcon from "@assets/icons/send-message-icon";
import Form from "@components/form";
import { COLORS } from "@utils/colors";
import React, { useEffect, useRef, useState } from "react";
import { useWSChat } from "src/contexts/ws-chat.context";
import Input from "../storybook/input";

interface ITopicMessageInputProps {}

const TopicMessageInput: React.FC<ITopicMessageInputProps> = ({ ...props }) => {
  const { openedTopic, notifyTyping, sendChatMessage } = useWSChat();

  const [newMessage, setNewMessage] = useState("");
  const [isNotified, setIsNotified] = useState(false);
  const isNotifiedTimeout = useRef<any>(null);

  useEffect(() => {
    isNotifiedTimeout.current = setTimeout(() => setIsNotified(false), 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotified]);

  function sendTypingNotification() {
    if (isNotified) return;
    notifyTyping(openedTopic?.topic!);
    setIsNotified(true);
  }

  function handleSubmit() {
    if (!newMessage) return;
    sendChatMessage(openedTopic?.topic!, newMessage);
    setNewMessage("");
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewMessage(e.target.value);

    if (!!e.target.value) {
      sendTypingNotification();
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className={`p-4 bg-gray-10 fic space-x-4`}>
        <div className={`fic space-x-2`}>
          <AttachmentIcon />
          <ImageIcon />
        </div>
        <Input
          autoFocus
          onChange={handleInputChange}
          value={newMessage}
          className={`w-full`}
          suffix={
            <SendMessageIcon
              fill={(!!newMessage && COLORS.PRIMARY.DEFAULT) || ""}
            />
          }
        />
      </div>
    </Form>
  );
};
export default TopicMessageInput;
