import { createSlice } from '@reduxjs/toolkit';

export interface appReducerType {
   deviceId: string,
   coinSettings: [],
   isWalletCreated: boolean,
   account:{},
   wallet:{}
}

const initialState: appReducerType = {
    deviceId: '',
    coinSettings:[],
    isWalletCreated:false,
    account:{},
    wallet:{}
};

export const appReducer = createSlice({
    initialState,
    name: 'appReducer',
    reducers: {
        setIsWalletCreated: (state, action) => {
            state.isWalletCreated = action.payload
        },

        setAccount: (state, action) => {
            state.account = action.payload
        },
        setWallet: (state, action) => {
            state.wallet = action.payload
        },

          clearAppReducer: () => initialState,
    }
});

export const {setIsWalletCreated, clearAppReducer, setAccount, setWallet } = appReducer.actions;

export default appReducer.reducer;
