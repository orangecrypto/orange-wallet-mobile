import "node-libs-react-native/globals";
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import 'react-native-crypto';
import "crypto-browserify";
import "react-native-randombytes";
import "stream-browserify";
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
import { SafeAreaView, View, StyleSheet, Text, AppState, Platform, StatusBar } from "react-native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppContainer from "./src/services/app/AppContainer";
import { persistor, store } from "./src/redux/store";
import { resetNavigation } from "./src/routes/Navigator"
import { RouteType } from "./src/routes/RouteType"
import useSeedVault from "./src/hooks/useSeedVault"
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import toastConfig from "./src/components/ToastConfig";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [isWalletCreated, setIsWalletCreated] = useState(store.getState().appReducer.isWalletCreated)
  const [network, setNetwork] = useState(store.getState().appReducer.network);
  const [appState, setAppState] = useState(AppState.currentState);
  const { lockVault, isVaultUnlocked } = useSeedVault();
  const handleLockWallet = async () => {
    try {
      if (await isVaultUnlocked()) {
        await lockVault();
        resetNavigation(RouteType.LOGIN);
      }
    } catch (error) {
      console.log("Lock Wallet", error);
    }
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setNetwork(store.getState().appReducer.network);
    });
    return () => unsubscribe();
  }, []);

  const backgroundTimeRef = React.useRef(null);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      const value = await AsyncStorage.getItem('isWalletCreated');
      const isWalletCreated = value === 'true';
      console.log('isWalletCreated ', isWalletCreated)
      if (!isWalletCreated) {
        return
      }
      if (appState === "active" && (nextAppState === "background" || nextAppState === "inactive")) {

        backgroundTimeRef.current = performance.now();
        console.log(`🔴 App moved to background at ${new Date().toLocaleTimeString()}`);
      }

      if (appState !== "active" && nextAppState === "active") {
        const resumeTime = performance.now();

        if (backgroundTimeRef.current) {
          const timeSpent = ((resumeTime - backgroundTimeRef.current) / 1000).toFixed(2);

          if (parseFloat(timeSpent) > 20) {
            handleLockWallet()
          }
          console.log(`🟢 App resumed at ${new Date().toLocaleTimeString()}`);
          console.log(`⏳ Time spent in background: ${timeSpent} seconds`);
        }
      }
      setAppState(nextAppState);

      if (nextAppState === 'active' && appState === 'active') {
        try {
          if (await isVaultUnlocked()) {
            await lockVault();
          }
        } catch (error) {
          console.log("Lock Wallet", error);
        }
      }
      console.log('handleAppStateChange : ', Platform.OS + ' nextAppState : ' + nextAppState + ' appState : ' + appState)
    };

    Platform.OS === 'ios' && handleAppStateChange(AppState.currentState);
    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      subscription.remove();
    };

  }, [appState]);

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
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: error?.message || 'Something went wrong.',
        });
        console.error('Error in query:', error)
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => console.error('Error in mutation:', error),
    }),
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={styles.safeArea}>
       
          <QueryClientProvider client={queryClient}>
            {network?.type === 'Testnet' && (
              <View style={styles.headerViewTestNet}>
                <Text style={styles.testNetText}>{'Testnet'}</Text>
              </View>
            )}
             <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
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
    backgroundColor: "#000000",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerViewTestNet: {
    height: 45,
    backgroundColor: '#D74320',
    justifyContent: 'center'
  },

  testNetText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  }
});
export default App;