import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation, i18n } from "next-i18next";
import { ApolloProvider, gql } from "@apollo/client";
import { useApollo } from "../utils/apollo";

function MyApp({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps);
	return (
		<ApolloProvider client={apolloClient}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}
export default appWithTranslation(MyApp);
