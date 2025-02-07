import { combineReducers } from 'redux';

import appReducer from './slice/appReducer';
import loginReducer  from '@redux/slice/LoginReducer';
import  seedPhraseReducer  from '@redux/slice/SeedPhraseReducer';
import  coinSettingsSlice  from '@redux/slice/CoinSettings';
import  walletReducer  from '@redux/slice/WalletReducer';

const reducer = combineReducers({
  appReducer,
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
