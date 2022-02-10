import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../utils/apollo";
import { ModalProvider } from "src/contexts/modal.context";
import ModalContainer from "@components/modal-container";

import "react-toastify/dist/ReactToastify.css";
import "../styles/custom-scrollbar.css";
import "../styles/custom-datepicker.css";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { isLogin, setRedirectLinkAfterLogin } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import Head from 'next/head';
import ChatwootWidget from "@components/chatwoot-widget";
import { WSChatProvider } from "src/contexts/ws-chat.context";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import vi from "javascript-time-ago/locale/vi.json";

TimeAgo.addDefaultLocale(vi);
TimeAgo.addLocale(en);

const NoLayout: React.FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const Layout = (Component as any).Layout ?? NoLayout;

  const { replace, locale, pathname } = useRouter();

  if (
    !isLogin() &&
    typeof window !== "undefined" &&
    pathname !== ROUTES.LOGIN &&
    pathname !== ROUTES.LOGOUT &&
    pathname !== ROUTES.SIGNUP &&
    pathname !== ROUTES.FORGET_PASSWORD
  ) {
    const fullHref = window.location.href;
    setRedirectLinkAfterLogin(fullHref);
    replace(ROUTES.TO_LOGIN(locale!));
  }

  return (
    <ApolloProvider client={apolloClient}>
      <WSChatProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=0.9, maximum-scale=0.9,user-scalable=0" />
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
