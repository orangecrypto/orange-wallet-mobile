import { createSlice } from '@reduxjs/toolkit';
import { HIRO_MAINNET_DEFAULT, BTC_BASE_URI_MAINNET } from "@orangecryptohq/orangeseed";
/**
 * Redux slice to manage application state, including:
 * - deviceId: Unique identifier for the device (to be stored in local storage)
 * - coinSettings: User-defined coin settings (to be stored in local storage)
 * - isWalletCreated: Flag indicating if the wallet has been created (to be stored in local storage)
 * - accountList: Stores multiple account list (to be stored in local storage)
 * - selectedAccount: Stores users selected account details (to be stored in local storage)
 * - wallet: Stores wallet details (to be stored in local storage)
 * - network : Stores current network setting (to be stored in local storage)
 * - currency : Stores currency setting (to be stored in local storage)
 * 
 * The state is updated via reducers and persisted to local storage where necessary.
 */

export interface appReducerType {
   deviceId: string,
   coinSettings: [],
   isWalletCreated: boolean,
   selectedAccount:{},
   wallet:{},
   network:{},
   currency:{},
   accountList:[],
   liquidiumToken:string,
}

const initialState: appReducerType = {
    deviceId: '',
    coinSettings:[],
    isWalletCreated:false,
    selectedAccount:{},
    liquidiumToken:'',
    wallet:{},
    network:{
        address:HIRO_MAINNET_DEFAULT , 
        btcApiUrl: BTC_BASE_URI_MAINNET,
        type: "Mainnet"
    },
    currency:{
        type: "USD"
    },
    accountList:[]
};

export const appReducer = createSlice({
    initialState,
    name: 'appReducer',
    reducers: {
        setIsWalletCreated: (state, action) => {
            state.isWalletCreated = action.payload
        },

        setSelectedAccount: (state, action) => {
            state.selectedAccount = action.payload
        },
        setWallet: (state, action) => {
            state.wallet = action.payload
        },
        setNetwork: (state, action) => {
            state.network = action.payload
        },
        setCurrency: (state, action) => {
            state.currency = action.payload
        },
        setLiquidiumToken: (state, action) => {
            state.liquidiumToken = action.payload
        },
        setAccountList: (state, action) => {
            state.accountList = action.payload
        },
        clearAppReducer: () => initialState,
    }
});

export const {setIsWalletCreated, clearAppReducer, setSelectedAccount, setWallet, setNetwork, setCurrency, setAccountList, setLiquidiumToken} = appReducer.actions;

export default appReducer.reducer;
