import { generateChatCredUnique, setChatAuthToken } from "@utils/auth-utils";
import {
  AttachmentMsg,
  TChatDataResp,
  TChatFileParam,
  TTopic,
  TTopics,
} from "@utils/chat-interface";
import {
  chatGetFirstSubMessage,
  chatGetHiMessage,
  chatGetLeaveMessage,
  chatGetLoginMessage,
  chatGetMeMessage,
  chatGetNotifyTypingMessage,
  chatGetSendFileMessage,
  chatGetSendMessageMessage,
  chatGetTopicMessagesMessage,
  chatGetUpdateProfileMessage,
} from "@utils/chat-to-server-messages";
import { chatGetTopicLastMessage } from "@utils/chat-to-server-messages";
import { CHAT_URL } from "@utils/constants";
import { getLoggedInCompany } from "@utils/functions";
import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useEffect,
  useState,
} from "react";

type WSProviderProps = { children: ReactNode };

type TWSChatContext = {
  topics: TTopics;
  openedTopic?: TTopic;
  loginChat: () => void;
  closeFocusTopic: () => void;
  notifyTyping: (topic: string) => void;
  setFocusTopic: (topic: string) => void;
  subscribeTopic: (topic: string) => void;
  sendChatMessage: (topic: string, message: string) => void;
  sendAttachment: (
    topic: string,
    caption: string,
    file: TChatFileParam
  ) => void;
  updateCompProfile: (imgUrl: string, tel: string) => {};
};

const WSChatStateContext = createContext<TWSChatContext | {}>({});

export const WSChatProvider = ({ children }: WSProviderProps): JSX.Element => {
  const wsChatInstance = useMemo(
    () => (typeof window != "undefined" ? new WebSocket(CHAT_URL) : null),
    []
  );

  const [topics, setTopics] = useState<TTopics>({});
  const [isReady, setIsReady] = useState(false);
  const [currentOpenedTopicId, setCurrentOpenedTopicId] = useState("");
  const [openedTopic, setOpenedTopic] = useState<TTopic>();

  function sendChatMessageToServer(message: string) {
    console.log("Sending : ", message);
    // TODO: Disable this to run local successfully without needing the message.
    wsChatInstance?.send(message);
  }

  useEffect(() => {
    if (!!wsChatInstance)
      wsChatInstance.onopen = () => {
        setIsReady(true);
      };

    return () => setIsReady(false);
  }, [wsChatInstance]);

  useEffect(() => {
    function sendFirstMessage() {
      if (!isReady) return;
      sendChatMessageToServer(chatGetHiMessage());
      loginChat();
    }

    sendFirstMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  if (wsChatInstance === null) return <>{children}</>;
  wsChatInstance.onmessage = handleWsChatMessage;

  /**
   * We subscribe a user chat called topic
   * @param topic The topic id to subscribe into
   */
  function subscribeTopic(topic: string) {
    // const obj = getObjectFromArray(topics, (t: TTopic) => t.topic === topic);
    const obj = topics[topic];
    if (!!obj) setFocusTopic(topic);
    else sendChatMessageToServer(chatGetFirstSubMessage(topic));
  }

  /**
   * To close focus from a topic
   */
  function closeFocusTopic() {
    leaveTopic(currentOpenedTopicId);
    setCurrentOpenedTopicId("");
    setOpenedTopic(undefined);
  }

  /**
   * Leaving topic topic but keep subscribe for it's message
   * @param topic the topic wanted to leave
   */
  function leaveTopic(topic: string) {
    if (!topic) return;
    sendChatMessageToServer(chatGetLeaveMessage(topic));
  }

  function generateNewData(topic: string, content: string | AttachmentMsg) {
    const openedTopicKeys = Object.keys(openedTopic?.messages || {});

    const newData: TChatDataResp = {
      topic,
      from: getLoggedInCompany()?.chatId!,
      content,
      seq: (parseInt(openedTopicKeys[openedTopicKeys.length - 1]) || 0) + 1,
      ts: new Date(),
    };
    return newData;
  }

  /**
   * Because when we sent message the new message update is not automatically show up
   * Then we refetch it programatically
   */
  function refetchData() {
    const sameTopicIdDifferentMem = currentOpenedTopicId;
    setTimeout(() => setFocusTopic(sameTopicIdDifferentMem), 50);
  }

  /**
   * To send a message to other user
   * @param topic
   * @param content
   */
  function sendChatMessage(topic: string, content: string) {
    // const newData = generateNewData(topic, content);
    // Because chat server not support to get the new message if we are the one who sent it
    // Then we make it like this
    // handleData(newData);

    sendChatMessageToServer(chatGetSendMessageMessage(topic, content));
    refetchData();
  }

  /**
   * To notify the other user that we are typing
   * @param topic
   */
  function notifyTyping(topic: string) {
    sendChatMessageToServer(chatGetNotifyTypingMessage(topic));
  }

  /**
   * To update company image url and tel
   * @param topic
   */
  function updateCompProfile(imgUrl: string, tel: string) {
    sendChatMessageToServer(chatGetUpdateProfileMessage(imgUrl, tel));
  }

  /**
   * Opening the topic and get the messages
   */
  function setFocusTopic(topic: string) {
    if (currentOpenedTopicId) leaveTopic(topic);

    setOpenedTopic(topics[topic]);
    setCurrentOpenedTopicId(topic);
    sendChatMessageToServer(chatGetTopicMessagesMessage(topic));
  }

  /**
   * Handling sending file only to certain topic
   * @param topic
   * @param capt
   * @param file
   */
  function sendAttachment(topic: string, capt: string, file: TChatFileParam) {
    // const newData = generateNewData(topic, {
    //   txt: capt,
    //   ent: [{ data: file }],
    // });

    sendChatMessageToServer(chatGetSendFileMessage(topic, capt, file));
    refetchData();
  }

  /**
   * This using the cookie data to login to chat server
   * we login using company.name and company.id with certain format
   */
  function loginChat() {
    const comp = getLoggedInCompany();
    if (!comp) return;
    const unique = generateChatCredUnique(comp.name, comp.id);
    sendChatMessageToServer(chatGetLoginMessage(unique));
  }

  /**
   * Getting topic last message
   * @param topic
   */
  function getTopicLastMessage(topic: string) {
    sendChatMessageToServer(chatGetTopicLastMessage(topic));
  }

  /**
   * Handling meta from chat server
   * @param meta from server
   *
   */
  function handleMeta(meta: any) {
    if (!meta) return;

    // This used to handling new topic
    if (meta.desc && !topics[meta.topic]) {
      if ([currentOpenedTopicId, "me"].includes(meta.topic)) return;
      const newTopic = Object.assign(
        { messages: {}, topic: meta.topic },
        meta.desc
      );
      topics[meta.topic] = newTopic;
      setTopics({ ...topics });
      setFocusTopic(meta.topic);
      // This used to handling subcribed chat
    } else if (meta.sub) {
      meta.sub.forEach((s: TTopic) => {
        if (s.topic === "me" || !s.topic || !!topics[s.topic]) return;
        getTopicLastMessage(s.topic);
        topics[s.topic] = Object.assign({ messages: {} }, s);
      });

      setTopics({ ...topics });
    }
  }

  /**
   * To handle all ctrl message from chat server
   * @param ctrl
   * @returns
   */
  function handleCtrl(ctrl: any) {
    if (!ctrl) return;
    // const paramsWhat = getCtrlParamsWhat(ctrl);

    const params = ctrl?.params;
    if (params?.authlvl === "auth") {
      setChatAuthToken(params?.token, params.expires);
      sendChatMessageToServer(chatGetMeMessage());
    }
  }

  function handleData(data: TChatDataResp) {
    if (!data) return;
    const topic = topics[data.topic];

    topic.messages[data.seq] = data;

    setTopics({ ...topics });
  }

  /**
   * We handle all websocket message here
   * @param e
   */
  function handleWsChatMessage(e: MessageEvent<any>) {
    const data = JSON.parse(e.data);
    console.log(data);

    handleMeta(data.meta);
    handleCtrl(data.ctrl);
    handleData(data.data);
  }

  return (
    <WSChatStateContext.Provider
      value={{
        topics,
        openedTopic,
        sendChatMessage,
        subscribeTopic,
        loginChat,
        setFocusTopic,
        notifyTyping,
        closeFocusTopic,
        sendAttachment,
        updateCompProfile,
      }}
    >
      {children}
    </WSChatStateContext.Provider>
  );
};

export const useWSChat = (): TWSChatContext => {
  const context = useContext(WSChatStateContext);
  if (context === undefined) {
    throw new Error("useWS must be used within a WSProvider");
  }

  return context as TWSChatContext;
};
