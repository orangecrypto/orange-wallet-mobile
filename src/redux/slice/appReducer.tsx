import { createSlice } from '@reduxjs/toolkit';

export interface appReducerType {
   deviceId: string,
   coinSettings: []
}

const initialState: appReducerType = {
    deviceId: '',
    coinSettings:[],
};

export const appReducer = createSlice({
    initialState,
    name: 'appReducer',
  
});

// Action creators are generated for each case reducer function
export const { } = appReducer.actions;

export default appReducer.reducer;
