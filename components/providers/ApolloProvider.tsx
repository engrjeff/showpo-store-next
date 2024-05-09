"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

const customFetch = (uri: string, options: any) => {
  const parsed = JSON.parse(options.body)["query"];
  return fetch(uri, {
    ...options,
    body: JSON.stringify({ query: parsed }),
  });
};

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_MAGENTO2_API_URL,
    useGETForQueries: true,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    fetchOptions: {
      mode: "no-cors",
    },
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
