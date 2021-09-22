import {
	ApolloClient,
	createHttpLink,
	from,
	HttpLink,
	InMemoryCache
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

import { useMemo } from "react";

const APOLLO_STATE_NAME = "__APOLLO_STATE__";

function createApolloClient() {
	// Used for handling error
	const errorLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			graphQLErrors.forEach((error) => {
				console.log(error.message);
			});
		}
	});

	// For connection to backend
	const httpLink = createUploadLink({
		uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
	});

	const link = from([errorLink, httpLink]);

	const apolloClient = new ApolloClient({
		ssrMode: typeof window === "undefined",
		link,
		cache: new InMemoryCache()
	});

	return apolloClient;
}

export function initApollo(initialState: any = null) {
	const _apolloClient = createApolloClient();

	return _apolloClient;
}

export const useApollo = (pageProps: any) => {
	const state = pageProps[APOLLO_STATE_NAME];
	return useMemo(() => initApollo(state), [state]);
};
