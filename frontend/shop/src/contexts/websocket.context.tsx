import { setChatAuthToken } from "@utils/auth-utils";
import { CHAT_URL } from "@utils/constants";
import { createContext, useContext, useMemo, ReactNode } from "react";

type WSProviderProps = { children: ReactNode };

const WSChatStateContext = createContext<WebSocket | null>(null);

export const WSChatProvider = ({ children }: WSProviderProps): JSX.Element => {
  const wsChatInstance = useMemo(
    () => (typeof window != "undefined" ? new WebSocket(CHAT_URL) : null),
    []
  );

  // useEffect(() => {
  //   return () => {
  //     wsInstance?.close();
  //   };
  // }, [wsInstance]);

  if (wsChatInstance === null) return <>{children}</>;

  wsChatInstance.onmessage = (e) => {
    const data = JSON.parse(e.data);
    const params = data?.ctrl?.params;
    if (!params) return;
    if (params?.authlvl === "auth") {
      setChatAuthToken(params?.token, params.expires);
    }
  };

  return (
    <WSChatStateContext.Provider value={wsChatInstance}>
      {children}
    </WSChatStateContext.Provider>
  );
};

export const useWSChat = (): WebSocket => {
  const context = useContext(WSChatStateContext);
  if (context === undefined) {
    throw new Error("useWS must be used within a WSProvider");
  }

  return context as WebSocket;
};
