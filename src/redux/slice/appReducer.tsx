import { createSlice } from '@reduxjs/toolkit';

export interface appReducerType {
   deviceId: string,
}

const initialState: appReducerType = {
    deviceId: '',
};

export const appReducer = createSlice({
    initialState,
    name: 'appReducer',
  
});

// Action creators are generated for each case reducer function
export const { } = appReducer.actions;

export default appReducer.reducer;
