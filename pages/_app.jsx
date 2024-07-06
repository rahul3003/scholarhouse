import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import store, { persistedStore } from "../store/store";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import { injectStore } from "@/utils/apiSetup";

injectStore(store);

export default function App({ Component, pageProps }) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null; // Return null or a loader while waiting for client-side hydration

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <Component {...pageProps} />
        <ToastContainer autoClose={2000} />
      </PersistGate>
    </Provider>
  );
}
