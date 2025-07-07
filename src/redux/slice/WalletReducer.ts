import { createSlice } from '@reduxjs/toolkit';

export interface walletReducerType {
    headerAddress: string
    tokenList: []
}

const initialState: walletReducerType = {
    headerAddress: '',
    tokenList: []
};

export const walletReducer = createSlice({
    initialState,
    name: 'walletReducer',
    reducers: {
        setHeaderAddress: (state, action) => {
            state.headerAddress = action.payload
        },
        setTokenList:(state, action) => {
            state.tokenList = action.payload
        },
        
        clearWalletReducer: () => initialState,

    },
});

export const { setHeaderAddress, setTokenList, clearWalletReducer} = walletReducer.actions;

export default walletReducer.reducer;
