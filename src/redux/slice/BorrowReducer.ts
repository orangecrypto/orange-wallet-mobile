import { createSlice } from '@reduxjs/toolkit';

export interface BorrowReducerType {
    medium:number,
    runeDivisiblity:number,
}

const initialState: BorrowReducerType = {
    medium:0,
    runeDivisiblity:0
};

export const borrowReducer = createSlice({
    initialState,
    name: 'borrowReducer',
    reducers: {
        setMedium: (state, action) => {
            state.medium = action.payload
        },
        setRuneDivisiblity: (state, action) => {
            state.runeDivisiblity = action.payload
        },
       
        clearBorrowReducer: () => initialState,
    },
});

export const { setMedium, setRuneDivisiblity, clearBorrowReducer} = borrowReducer.actions;

export default borrowReducer.reducer;
