
import * as React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import AppContainer from './src/services/app/AppContainer';
import { persistor, store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <View style={{flex:1}}>
          <AppContainer />
        </View>
      </PersistGate>
    </Provider >
  );
}
export default App;
