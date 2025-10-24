import { createSlice } from '@reduxjs/toolkit';

export interface SwapReducerType {
    sllipage:number,
    liquidiumFee: number
}

const initialState: SwapReducerType = {
    sllipage:7,
    liquidiumFee:0,
};

export const swapReducer = createSlice({
    initialState,
    name: 'swapReducer',
    reducers: {
        setSlippage: (state, action) => {
            state.sllipage = action.payload
        },
        setLiquidiumFee: (state, action) => {
            state.liquidiumFee = action.payload
        },
        clearSwapReducer: () => initialState,
    },
});

export const { setSlippage,setLiquidiumFee, clearSwapReducer} = swapReducer.actions;

export default swapReducer.reducer;
