import "../styles/globals.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import Head from "next/head";
import store from "../store";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Head>
        <title>BLOCKBASE</title>
        <meta
          name="description"
          content="BLOCKBASE - Your Crypto and NFT Portfolio Viewer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
