import React, { useContext, useEffect } from "react";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ApolloProvider } from "@apollo/client";

import { useApollo } from "../utils/apollo";
import PageNameProvider, { usePageName } from "src/contexts/page-name.context";

import "../styles/custom-datepicker.css";
import "../styles/globals.css";

const NoLayout: React.FC<any> = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const Layout = (Component as any).Layout ?? NoLayout;

  return (
    <ApolloProvider client={apolloClient}>
      <PageNameProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PageNameProvider>
    </ApolloProvider>
  );
}
export default appWithTranslation(MyApp);
