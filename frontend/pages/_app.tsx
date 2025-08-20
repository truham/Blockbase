import "../src/styles/globals.css";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/store";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
