import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation, i18n } from "next-i18next";
import { ApolloProvider, gql } from "@apollo/client";
import { useApollo } from "../utils/apollo";
import AuthProvider from "src/contexts/auth.context";

const NoLayout: React.FC = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const Layout = (Component as any).Layout ?? NoLayout;

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  );
}
export default appWithTranslation(MyApp);
