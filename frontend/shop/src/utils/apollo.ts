import {
  ApolloClient,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

import { useMemo } from "react";
import { getAuthCredentials } from "./auth-utils";
import { replaceToLogout } from "./functions";

export const APOLLO_STATE_NAME = "__APOLLO_STATE__";

const apolloErrorMessage = {
  jwtSecretError: "invalid signature",
};

function createApolloClient() {
  // For authorization
  const authLink = setContext((_, { headers }) => {
    const token = getAuthCredentials().token;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  // Used for handling error
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((error) => {
        const msg = error.message;
        console.log(msg);
        if (msg.includes(apolloErrorMessage.jwtSecretError)) {
          replaceToLogout();
        }
      });
    }
  });

  // For connection to backend
  const httpLink: any = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  });

  const link = from([authLink, errorLink, httpLink]);

  const apolloClient = new ApolloClient({
    ssrMode: typeof window === "undefined",
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            discoveryBuyingRequests: {
              keyArgs: false,
              merge(existing, incoming) {
                return existing
                  ? { ...incoming, data: [...existing.data, ...incoming.data] }
                  : incoming;
              },
            },
            services: {
              keyArgs: false,
              merge(existing, incoming) {
                return existing
                  ? {
                      ...incoming,
                      services: [...existing.services, ...incoming.services],
                    }
                  : incoming;
              },
            },
            companies: {
              keyArgs: false,
              merge(existing, incoming) {
                return existing
                  ? {
                      ...incoming,
                      companies: [...existing.companies, ...incoming.companies],
                    }
                  : incoming;
              },
            },
          },
        },
      },
    }),
  });

  return apolloClient;
}

export function initApollo(initialState: any = null) {
  const _apolloClient = createApolloClient();

  return _apolloClient;
}

export function spreadApolloToState(
  apolloClient: ApolloClient<NormalizedCacheObject>
) {
  return { [APOLLO_STATE_NAME]: apolloClient.cache.extract() };
}

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_NAME];
  return useMemo(() => initApollo(state), [state]);
};
