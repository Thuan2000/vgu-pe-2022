import type { AppProps } from "next/app";
import { appWithTranslation, useTranslation } from "next-i18next";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../utils/apollo";
import { ModalProvider } from "src/contexts/modal.context";
import ModalContainer from "@components/modal-container";

import "react-toastify/dist/ReactToastify.css";
import "../styles/custom-scrollbar.css";
import "../styles/custom-datepicker.css";
import "../styles/globals.css";
import { toast, ToastContainer } from "react-toastify";
import { isLogin, setRedirectLinkAfterLogin } from "@utils/auth-utils";
import {
  ALLOWED_UNAUTHENTICATED_ROUTES,
  MUST_AUTHENTICATED_ROUTES,
  ROUTES,
  SHOULD_UNATHETICATED_ROUTES,
} from "@utils/routes";
import { useRouter } from "next/router";
import Head from "next/head";
import ChatwootWidget from "@components/chatwoot-widget";
import { WSChatProvider } from "src/contexts/ws-chat.context";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import vi from "javascript-time-ago/locale/vi.json";
import { useEffect, useRef } from "react";
import { rfw } from "@utils/functions";

TimeAgo.addLocale(vi);
TimeAgo.addLocale(en);

const NoLayout: React.FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const { t } = useTranslation();
  const apolloClient = useApollo(pageProps);
  const Layout = (Component as any).Layout ?? NoLayout;

  const { replace, locale, pathname } = useRouter();

  function fireToast() {
    toast.error(t("you-need-to-login"));
  }

  function getFullHref() {
    const fullHref = window.location.href;
    return fullHref;
  }

  function checkShoudAuthenticated() {
    return MUST_AUTHENTICATED_ROUTES.some((e) =>
      rfw(pathname).includes(rfw(e))
    );
  }

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !isLogin() &&
      checkShoudAuthenticated() &&
      !SHOULD_UNATHETICATED_ROUTES.some((e) => pathname.includes(e))
    ) {
      fireToast();
      setRedirectLinkAfterLogin(getFullHref());
      replace(ROUTES.TO_LOGIN(locale!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <ApolloProvider client={apolloClient}>
      <WSChatProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=0.9, maximum-scale=0.9,user-scalable=0"
          />
        </Head>
        <ModalProvider>
          <ModalContainer />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer autoClose={2000} theme="colored" />
          <ChatwootWidget />
        </ModalProvider>
      </WSChatProvider>
    </ApolloProvider>
  );
}
export default appWithTranslation(MyApp);
