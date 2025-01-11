import { combineReducers } from 'redux';

import appReducer from './slice/appReducer';
import formReducer from './slice/formreducer';

const reducer = combineReducers({
  appReducer,
  formReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'appReducer/loggedOut') {
    state.appReducer.token = ''
  }
  return reducer(state, action);
};

export default rootReducer;
