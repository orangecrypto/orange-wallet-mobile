import { createSlice } from '@reduxjs/toolkit';

export interface walletReducerType {
    headerAddress: string
    
    
}

const initialState: walletReducerType = {
    headerAddress: '',
   
};

export const walletReducer = createSlice({
    initialState,
    name: 'walletReducer',
    reducers: {
        setHeaderAddress: (state, action) => {
            state.headerAddress = action.payload
        },
        
        clearWalletReducer: () => initialState,

    },
});

export const { setHeaderAddress, clearWalletReducer} = walletReducer.actions;

export default walletReducer.reducer;
