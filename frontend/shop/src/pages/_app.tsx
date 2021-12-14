import type { AppProps } from "next/app";
import { appWithTranslation, i18n } from "next-i18next";
import { ApolloProvider, gql } from "@apollo/client";
import { useApollo } from "../utils/apollo";
import { ModalProvider } from "src/contexts/modal.context";
import ModalContainer from "@components/modal-container";

import "react-toastify/dist/ReactToastify.css";
import "../styles/custom-datepicker.css";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";

const NoLayout: React.FC = ({ children }) => <>{children}</>;

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
        <ToastContainer autoClose={2000} theme="colored" />
      </ModalProvider>
    </ApolloProvider>
  );
}
export default appWithTranslation(MyApp);
