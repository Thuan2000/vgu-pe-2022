import { setChatAuthToken } from "@utils/auth-utils";
import {
  chatGetHiMessage,
  chatGetLoginMessage,
  chatGetTopicMessage,
  chatGetTopicWithDescMessages,
} from "@utils/chat-utils";
import { CHAT_URL } from "@utils/constants";
import {
  generateChatPassword,
  generateUsername,
  getCompanyChatId,
  getLoggedInUser,
} from "@utils/functions";
import { IChatSub, IChatSubPublic, IChatTopic } from "@utils/interfaces";
import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useEffect,
  useState,
  useRef,
} from "react";

type WSProviderProps = { children: ReactNode };

type TWSChatContext = {
  wsChatInstance?: WebSocket;
  companyChatId?: string;
  isReady: boolean;
  setCompanyChatId: (data: string) => void;
  unreadedMessages: any;
};

const WSChatStateContext = createContext<TWSChatContext | null>(null);

interface ITopicDetail {
  /**
   * key === Topic
   * value === IChatSubPublic
   *  */
  [topic: string]: IChatSubPublic;
}

export const WSChatProvider = ({ children }: WSProviderProps): JSX.Element => {
  const wsChatInstance = useMemo(
    () => (typeof window != "undefined" ? new WebSocket(CHAT_URL) : null),
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [companyChatId, setCompanyChatId] = useState(getCompanyChatId());
  const [isReady, setIsReady] = useState(false);
  const [unreadedMessages, setUnreadedMessages] = useState<ITopicDetail>({});
  const readedMessages = useRef<ITopicDetail>({});

  useEffect(() => {
    if (!!wsChatInstance)
      wsChatInstance.onopen = () => {
        setIsOpen(true);
        setIsReady(true);
      };

    return () => {
      setIsReady(false);
    };
  }, [wsChatInstance]);

  useEffect(() => {
    function sendFirstMessage() {
      if (!isOpenWS()) return;

      wsChatInstance?.send(chatGetHiMessage());

      const email = getLoggedInUser()?.email;
      if (!email) return;

      wsChatInstance?.send(
        chatGetLoginMessage(
          generateUsername(email),
          `${generateChatPassword(email)}123`
        )
      );
    }

    sendFirstMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  function isOpenWS() {
    return ![
      WebSocket.CONNECTING,
      WebSocket.CLOSED,
      WebSocket.CLOSING,
    ].includes(wsChatInstance?.readyState || 0);
  }

  if (wsChatInstance === null) return <>{children}</>;
  wsChatInstance.onmessage = handleWsChatMessage;

  function handleData(data: IChatTopic) {
    const { topic, content, from, ts } = data;
    if (from !== topic) return;
    const currentFrom =
      unreadedMessages[topic] || readedMessages.current[topic];

    unreadedMessages[topic] = {
      ...currentFrom,
      from,
      lastMessage: content,
      ts,
    };

    setUnreadedMessages(Object.assign({}, unreadedMessages));
  }

  function handlePres(pres: {
    src: string;
    from: string;
    what: string;
    topic: string;
  }) {
    wsChatInstance?.send(chatGetTopicWithDescMessages(pres.src));
  }

  function handleInfo(info: {
    src: string;
    from: string;
    what: string;
    topic: string;
  }) {
    if (info.what === "read") {
      unreadedMessages[info.topic].isReaded = true;
      setUnreadedMessages(Object.assign({}, unreadedMessages));
    }

    if (
      info.what === "recv" &&
      info.topic !== "me" &&
      unreadedMessages[info.topic].isReaded
    ) {
      wsChatInstance?.send(chatGetTopicMessage(info.topic));
      unreadedMessages[info.topic].isReaded = false;
      setUnreadedMessages(Object.assign({}, unreadedMessages));
    }

    if (info.what === "recv" && info.from !== info.src && !!info.src)
      wsChatInstance?.send(chatGetTopicWithDescMessages(info.src));
  }

  function handleMeta(meta: {
    sub: IChatSub[];
    topic: string;
    desc: { public: IChatSubPublic };
  }) {
    const { sub = [], topic, desc } = meta;
    if (!!topic && topic !== "me") {
      unreadedMessages[topic] = {
        ...desc?.public,
        ...unreadedMessages[topic],
      };
      setUnreadedMessages(Object.assign({}, unreadedMessages));
    }

    sub.forEach((s) => {
      const { read, seq, topic, public: pub } = s;
      if (!seq || seq <= (read || 0) || topic?.substring(0, 3) === "grp")
        return;

      unreadedMessages[topic] = pub;
      wsChatInstance?.send(chatGetTopicMessage(topic));
    });
  }

  function handleWsChatMessage(e: MessageEvent<any>) {
    const data = JSON.parse(e.data);
    console.log(data);
    if (!!data.meta) handleMeta(data.meta);
    if (!!data.data) handleData(data.data);
    if (!!data.info) handleInfo(data.info);
    if (!!data.pres) handlePres(data.pres);
    const params = data?.ctrl?.params;
    if (params?.authlvl === "auth")
      setChatAuthToken(params?.token, params.expires);
  }

  return (
    <WSChatStateContext.Provider
      value={{
        wsChatInstance: wsChatInstance!,
        companyChatId: companyChatId!,
        isReady,
        setCompanyChatId,
        unreadedMessages,
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
