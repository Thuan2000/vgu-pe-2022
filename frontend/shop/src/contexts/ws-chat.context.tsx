import { generateChatCredUnique, setChatAuthToken } from "@utils/auth-utils";
import { TDataResp } from "@utils/chat-interface";
import {
  chatGetFirstSubMessage,
  chatGetHiMessage,
  chatGetLeaveMessage,
  chatGetLoginMessage,
  chatGetMeMessage,
  chatGetNotifyTypingMessage,
  chatGetSendMessageMessage,
  chatGetTopicMessagesMessage,
} from "@utils/chat-messages";
import { CHAT_URL } from "@utils/constants";
import {
  isHaveDuplicate,
  getLoggedInCompany,
  getObjectFromArray,
} from "@utils/functions";
import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useEffect,
  useState,
} from "react";

type WSProviderProps = { children: ReactNode };

type TUserPublic = {
  fn: string;
};

type TUserSeen = {
  ua: string;
  when: Date;
};

export type TTopic = {
  online?: boolean;
  public: TUserPublic;
  seen?: TUserSeen;
  topic: string;
  touched: Date;
  updated: Date;
  messages: { [any: number]: TDataResp };
};

type TWSChatContext = {
  topics: TTopic[];
  openedTopic?: TTopic;
  loginChat: () => void;
  closeFocusTopic: () => void;
  notifyTyping: (topic: string) => void;
  setFocusTopic: (topic: string) => void;
  subscribeTopic: (topic: string) => void;
  sendChatMessage: (topic: string, message: string) => void;
};

const WSChatStateContext = createContext<TWSChatContext | {}>({});

export const WSChatProvider = ({ children }: WSProviderProps): JSX.Element => {
  const wsChatInstance = useMemo(
    () => (typeof window != "undefined" ? new WebSocket(CHAT_URL) : null),
    []
  );

  const [topics, setTopics] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [currentOpenedTopicId, setCurrentOpenedTopicId] = useState("");
  const [openedTopic, setOpenedTopic] = useState<TTopic>();

  function sendChatMessageToServer(message: string) {
    console.log("Sending : ", message);
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
    const obj = getObjectFromArray(topics, (t: TTopic) => t.topic === topic);
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
    sendChatMessageToServer(chatGetLeaveMessage(topic));
  }

  /**
   * To send a message to other user
   * @param topic
   * @param content
   */
  function sendChatMessage(topic: string, content: string) {
    const openedTopicKeys = Object.keys(openedTopic?.messages || {});
    const newData: TDataResp = {
      topic,
      from: getLoggedInCompany()?.chatId!,
      content,
      seq: parseInt(openedTopicKeys[openedTopicKeys.length - 1]) + 1,
      ts: new Date(),
    };
    // Because chat server not support to get the new message if we are the one who sent it
    // Then we make it like this
    handleData(newData);

    sendChatMessageToServer(chatGetSendMessageMessage(topic, content));
  }

  /**
   * To notify the other user that we are typing
   * @param topic
   */
  function notifyTyping(topic: string) {
    sendChatMessageToServer(chatGetNotifyTypingMessage(topic));
  }

  /**
   * Opening the topic and get the messages
   */
  function setFocusTopic(topic: string) {
    if (currentOpenedTopicId) leaveTopic(topic);

    setCurrentOpenedTopicId(topic);
    setOpenedTopic(
      getObjectFromArray(topics, (i: TTopic) => i.topic === topic).obj
    );
    sendChatMessageToServer(chatGetTopicMessagesMessage(topic));
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
   * Handling meta from chat server
   * @param meta from server
   *
   */
  function handleMeta(meta: any) {
    if (!meta) return;
    // console.log(meta);
    if (meta.sub && !topics.length) {
      const newTopics = meta.sub.flatMap((s: TTopic) => {
        if (isHaveDuplicate(topics, (i: TTopic) => i.topic === s.topic))
          return [];
        return Object.assign({ messages: {} }, s);
      });

      setTopics(newTopics);
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

  function handleData(data: TDataResp) {
    if (!data) return;

    const { obj: topic, idx } = getObjectFromArray(
      topics,
      (i: TTopic) => i.topic === data.topic
    );
    topic.messages[data.seq] = data;

    (topics as any)[idx] = topic;
    setTopics([...topics]);
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
