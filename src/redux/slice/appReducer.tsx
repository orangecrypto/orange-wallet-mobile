import { createSlice } from '@reduxjs/toolkit';

/**
 * Redux slice to manage application state, including:
 * - deviceId: Unique identifier for the device (to be stored in local storage)
 * - coinSettings: User-defined coin settings (to be stored in local storage)
 * - isWalletCreated: Flag indicating if the wallet has been created (to be stored in local storage)
 * - account: Stores user account details (to be stored in local storage)
 * - wallet: Stores wallet details (to be stored in local storage)
 * 
 * The state is updated via reducers and persisted to local storage where necessary.
 */

export interface appReducerType {
   deviceId: string,
   coinSettings: [],
   isWalletCreated: boolean,
   account:{},
   wallet:{},
   network:{},
}

const initialState: appReducerType = {
    deviceId: '',
    coinSettings:[],
    isWalletCreated:false,
    account:{},
    wallet:{},
    network:{
        address: "https://api.hiro.so", 
        btcApiUrl: "https://mempool.space/api",
        type: "Mainnet"
    }
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
        setNetwork: (state, action) => {
            state.network = action.payload
        },
        clearAppReducer: () => initialState,
    }
});

export const {setIsWalletCreated, clearAppReducer, setAccount, setWallet, setNetwork } = appReducer.actions;

export default appReducer.reducer;
