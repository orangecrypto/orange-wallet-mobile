import * as React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppContainer from './src/services/app/AppContainer';
import { persistor, store } from './src/redux/store';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import toastConfig from './src/components/ToastConfig'

import "node-libs-react-native/globals"; // Loads necessary polyfills

global.Buffer = require("buffer").Buffer;
global.process = require("process");

if (typeof global.stream === "undefined") {
  global.stream = require("readable-stream");
}
const App = () => {



  React.useEffect(() => {

  })

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnReconnect: true,
        staleTime: 10 * 60 * 1000,
        //  cacheTime: 10 * 60 * 1000,
        refetchInterval: 10 * 60 * 1000,
      }
    },
    queryCache: new QueryCache({
      onError: (error) => {
        console.error('Error in query:', error);
        // Global error handling here (e.g., Toast notification)
      
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        console.error('Error in mutation:', error);

        // Global error handling for mutations
      },
    }),
  });
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={styles.safeArea}>
          <QueryClientProvider client={queryClient}>
            <AppContainer />
            <Toast config={toastConfig} position='bottom' visibilityTime={2000} />
          </QueryClientProvider>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensures the SafeAreaView covers the full screen
    backgroundColor: '#fff', // Optional: Set a background color
  },
});

export default App;
