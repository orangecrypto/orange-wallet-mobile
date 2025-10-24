import { combineReducers } from 'redux';

import appReducer from './slice/appReducer';
import loginReducer  from '@redux/slice/LoginReducer';
import  seedPhraseReducer  from '@redux/slice/SeedPhraseReducer';
import  coinSettingsSlice  from '@redux/slice/CoinSettings';
import  walletReducer  from '@redux/slice/WalletReducer';
import  swapReducer  from './slice/SwapReducer';
import  borrowReducer  from './slice/BorrowReducer';

const reducer = combineReducers({
  appReducer,
  loginReducer,
  seedPhraseReducer,
  coinSettingsSlice,
  walletReducer,
  swapReducer,
  borrowReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'appReducer/loggedOut') {
    state.appReducer.token = ''
  }
  return reducer(state, action);
};

export default rootReducer;
