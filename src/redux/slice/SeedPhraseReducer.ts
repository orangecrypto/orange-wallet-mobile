import { createSlice } from '@reduxjs/toolkit';

export interface seedPhraseReducerType {
    isSeedPhraseVerified:boolean;
    disabled : boolean,
    isRestoreWallet: boolean   
}

const initialState: seedPhraseReducerType = {
    isSeedPhraseVerified:false,
    disabled : true,
    isRestoreWallet: false
};

export const seedPhraseReducer = createSlice({
    initialState,
    name: 'SeedPhraseReducer',
    reducers: {
        setDisabled: (state, action) => {
            state.disabled = action.payload;
        },
        setIsRestoreWallet: (state, action) => {
            state.isRestoreWallet = action.payload;
        },
        setIsSeedPhraseVerified: (state, action) => {
            state.isSeedPhraseVerified = action.payload;
        },
        clearSeedPhraseReducer: () => initialState,

    },
});

export const { setIsRestoreWallet,clearSeedPhraseReducer, setDisabled, setIsSeedPhraseVerified } = seedPhraseReducer.actions;

export default seedPhraseReducer.reducer;
