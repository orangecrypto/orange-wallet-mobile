import { createSlice } from '@reduxjs/toolkit';

export interface appReducerType {
   deviceId: string,
   coinSettings: [],
   isWalletCreated: boolean
}

const initialState: appReducerType = {
    deviceId: '',
    coinSettings:[],
    isWalletCreated:false
};

export const appReducer = createSlice({
    initialState,
    name: 'appReducer',
    reducers: {
        setIsWalletCreated: (state, action) => {
            state.isWalletCreated = action.payload
        },

          clearAppReducer: () => initialState,
    }
});

// Action creators are generated for each case reducer function
export const {setIsWalletCreated, clearAppReducer } = appReducer.actions;

export default appReducer.reducer;
