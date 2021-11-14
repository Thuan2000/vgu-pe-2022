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

const NoLayout: React.FC<any> = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const Layout = (Component as any).Layout ?? NoLayout;

  return (
    <ApolloProvider client={apolloClient}>
      <ModalProvider>
        <ModalContainer />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalProvider>
    </ApolloProvider>
  );
}
export default appWithTranslation(MyApp);
