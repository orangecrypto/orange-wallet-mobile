import { combineReducers } from 'redux';

import appReducer from './slice/appReducer';
import formReducer from './slice/formreducer';
import loginReducer  from '@screens/login/LoginReducer';
import  seedPhraseReducer  from '@screens/seedphrase/SeedPhraseReducer';

const reducer = combineReducers({
  appReducer,
  formReducer,
  loginReducer,
  seedPhraseReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'appReducer/loggedOut') {
    state.appReducer.token = ''
  }
  return reducer(state, action);
};

export default rootReducer;
