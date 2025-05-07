import { createSlice } from '@reduxjs/toolkit';

export interface walletReducerType {
    headerAddress: string
    tokenList: [],
    cardIndex: number,
}

const initialState: walletReducerType = {
    headerAddress: '',
    tokenList: [],
    cardIndex: -1,
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

        setCardIndex:(state, action) => {
            state.cardIndex = action.payload
        },
        
        clearWalletReducer: () => initialState,

    },
});

export const { setHeaderAddress, setTokenList,setCardIndex, clearWalletReducer} = walletReducer.actions;

export default walletReducer.reducer;
