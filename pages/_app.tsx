import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";

import { AppWrapper } from "../context/AppContext";
import type { AppProps } from "next/app";
import Script from "next/script";
import client from "../context/apollo-client";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <ApolloProvider client={client}>
        <Script src="https://unpkg.com/phosphor-icons" />
        <Component {...pageProps} />
      </ApolloProvider>
    </AppWrapper>
  );
}

export default MyApp;
