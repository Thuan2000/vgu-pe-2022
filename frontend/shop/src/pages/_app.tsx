import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../utils/apollo";
import { ModalProvider } from "src/contexts/modal.context";
import ModalContainer from "@components/modal-container";
import Script from "next/script";

import "react-toastify/dist/ReactToastify.css";
import "../styles/custom-scrollbar.css";
import "../styles/custom-datepicker.css";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { isLogin, setRedirectLinkAfterLogin } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";

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
    pathname !== ROUTES.SIGNUP
  ) {
    const fullHref = window.location.href;
    setRedirectLinkAfterLogin(fullHref);
    replace(ROUTES.TO_LOGIN(locale!));
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ModalProvider>
        <ModalContainer />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer autoClose={2000} theme="colored" />
        <Script
          onLoad={() => {
            // @ts-ignore
            window.onUsersnapCXLoad = function (api) {
              api.init();
            };
            // @ts-ignore
            var script = document.createElement("script");
            // @ts-ignore
            script.defer = 1;
            script.src =
              "https://widget.usersnap.com/global/load/d29420f8-4a66-4ff2-886f-ea64ed0c2d27?onload=onUsersnapCXLoad";
            document.getElementsByTagName("head")[0].appendChild(script);
          }}
        />
      </ModalProvider>
    </ApolloProvider>
  );
}
export default appWithTranslation(MyApp);
