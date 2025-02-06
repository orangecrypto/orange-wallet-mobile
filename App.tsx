import "node-libs-react-native/globals";
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import 'react-native-crypto';

import { Buffer } from "buffer";
import process from "process";

if (!global.crypto) {
  global.crypto = crypto;
}
if (typeof global.Buffer === "undefined") {
  global.Buffer = Buffer;
}
if (typeof global.process === "undefined") {
  global.process = process;
}
if (typeof global.stream === "undefined") {
  global.stream = require("readable-stream");
}
import * as React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppContainer from "./src/services/app/AppContainer";
import { persistor, store } from "./src/redux/store";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import toastConfig from "./src/components/ToastConfig";
import SeedVaultService from "./src/services/seedVault/seedVault";

const App = () => {
  React.useEffect(() => {
    const initializeSeedVault = async () => {
      try {
        console.log("Initializing SeedVault...");
        await SeedVaultService.initialize() 
        console.log("SeedVault initialized successfully!");
      } catch (error) {
        console.error("Error initializing SeedVault:", error.message);
      }
    };

    initializeSeedVault();
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnReconnect: true,
        staleTime: 10 * 60 * 1000,
        refetchInterval: 10 * 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => console.error("Error in query:", error),
    }),
    mutationCache: new MutationCache({
      onError: (error) => console.error("Error in mutation:", error),
    }),
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={styles.safeArea}>
          <QueryClientProvider client={queryClient}>
            <AppContainer />
            <Toast config={toastConfig} position="bottom" visibilityTime={2000} />
          </QueryClientProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
