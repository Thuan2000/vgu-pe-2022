import React from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ApolloProvider } from "@apollo/client";

import { useApollo } from "../utils/apollo";

import ModalContainer from "@components/modal-container";
import { ModalProvider } from "src/contexts/modal.context";

import "../styles/custom-scrollbar.css";
import "../styles/custom-datepicker.css";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useAuth } from "src/hooks/useAuth.hook";
import { useRouter } from "next/dist/client/router";
import { ROUTES } from "@utils/routes";
import { setRedirectLinkAfterLogin } from "@utils/auth-utils";

const NoLayout: React.FC<any> = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const Layout = (Component as any).Layout ?? NoLayout;
  const { replace, locale, pathname } = useRouter();
  const { isLogin } = useAuth();

  if (!isLogin && typeof window !== "undefined" && pathname !== ROUTES.LOGOUT) {
    const fullHref = window.location.href;
    setRedirectLinkAfterLogin(fullHref);
    replace(ROUTES.LOGIN(locale!));
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ModalProvider>
        <ModalContainer />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer autoClose={2000} theme="colored" />
      </ModalProvider>
    </ApolloProvider>
  );
}
export default appWithTranslation(MyApp);
