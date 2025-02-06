import { combineReducers } from 'redux';

import appReducer from './slice/appReducer';
import formReducer from './slice/formreducer';
import loginReducer  from '@screens/login/LoginReducer';
import  seedPhraseReducer  from '@screens/seedphrase/SeedPhraseReducer';
import  coinSettingsSlice  from '@screens/addcoin/CoinSettings';
import  walletReducer  from '@screens/mainwallet/WalletReducer';

const reducer = combineReducers({
  appReducer,
  formReducer,
  loginReducer,
  seedPhraseReducer,
  coinSettingsSlice,
  walletReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'appReducer/loggedOut') {
    state.appReducer.token = ''
  }
  return reducer(state, action);
};

export default rootReducer;
