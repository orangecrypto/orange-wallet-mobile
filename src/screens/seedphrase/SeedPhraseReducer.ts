import { createSlice } from '@reduxjs/toolkit';

export interface seedPhraseReducerType {
    password: string
    passwordError: string
    confirmPassword: string
    confirmPasswordError: string
    passwordFeedback: string;
    disabled : boolean
}

const initialState: seedPhraseReducerType = {
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    passwordFeedback: '',
    disabled : true
};

export const seedPhraseReducer = createSlice({
    initialState,
    name: 'SeedPhraseReducer',
    reducers: {
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setPasswordError: (state, action) => {
            state.passwordError = action.payload
        },
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload
        },
        setConfirmPasswordError: (state, action) => {
            state.confirmPasswordError = action.payload
        },
        setPasswordFeedback: (state, action) => {
            state.passwordFeedback = action.payload;
        },
        setDisabled: (state, action) => {
            state.disabled = action.payload;
        },
        clearSeedPhraseReducer: () => initialState,

    },
});

// Action creators are generated for each case reducer function
export const { setPassword, setPasswordError, setConfirmPassword, setConfirmPasswordError, setPasswordFeedback ,clearSeedPhraseReducer, setDisabled } = seedPhraseReducer.actions;

export default seedPhraseReducer.reducer;
