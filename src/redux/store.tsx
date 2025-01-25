import { Action, configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, } from 'redux-persist';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';

const config = {
  blacklist: [],
  key: 'root',
  storage: AsyncStorage,
  timeout: 0,
  version: -1,
  whitelist: ['appReducer', 'coinSettingsSlice']
};

const persistedReducer = persistReducer(config, rootReducer)
export const store = configureStore({
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }),
  reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = ThunkDispatch<RootState, undefined, Action>;
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);