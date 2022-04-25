import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ApolloProvider } from "@apollo/client";

import { useApollo } from "../utils/apollo";

import ModalContainer from "@components/modal-container";
import { ModalProvider } from "src/contexts/modal.context";

import "../styles/custom-scrollbar.css";
import "../styles/custom-datepicker.css";
import "../styles/custom-react-quill.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import { ROUTES } from "@utils/routes";
import { isLogin } from "@utils/auth-utils";
import { printServerInfo, replaceToLogin } from "@utils/functions";
import ChatwootWidget from "@components/chatwoot-widget";
import { WSChatProvider } from "src/contexts/ws-chat.context";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import vi from "javascript-time-ago/locale/vi.json";
import { SubsInfoProvider } from "src/contexts/subs-info.context";

TimeAgo.addLocale(vi);
TimeAgo.addLocale(en);

const NoLayout: React.FC<any> = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const Layout = (Component as any).Layout ?? NoLayout;
  const { replace, locale, pathname } = useRouter();

  // To Print server info because right now it's a bit harder to maintain environment variables
  useEffect(() => {
    printServerInfo();
  }, []);

  function handleRedirect() {
    const fullHref = window.location.href;
    replaceToLogin(fullHref);
  }

  if (typeof window !== "undefined" && pathname !== ROUTES.LOGOUT && !isLogin())
    handleRedirect();

  return (
    <ApolloProvider client={apolloClient}>
      <SubsInfoProvider>
        <ModalProvider>
          <WSChatProvider>
            <ModalContainer />
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ToastContainer autoClose={2000} theme="colored" />
            <ChatwootWidget />
          </WSChatProvider>
        </ModalProvider>
      </SubsInfoProvider>
    </ApolloProvider>
  );
}
export default appWithTranslation(MyApp);
