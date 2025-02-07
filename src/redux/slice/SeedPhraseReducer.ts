import { createSlice } from '@reduxjs/toolkit';

export interface seedPhraseReducerType {
    password: string
    passwordError: string
    confirmPassword: string
    confirmPasswordError: string
    confirmPasswordFeedback: string
    passwordFeedback: string;
    isSeedPhraseVerified:boolean;
    disabled : boolean,
    isRestoreWallet: boolean
    
}

const initialState: seedPhraseReducerType = {
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    confirmPasswordFeedback: '',
    passwordFeedback: '',
    words:'',
    isSeedPhraseVerified:false,
    disabled : true,
    wordsArray: [],
    isRestoreWallet: false
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
        setConfirmPasswordFeedBack: (state, action) => {
            state.confirmPasswordFeedback = action.payload
        },
        setPasswordFeedback: (state, action) => {
            state.passwordFeedback = action.payload;
        },

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

export const { setPassword, setPasswordError, setIsRestoreWallet, setConfirmPassword, setConfirmPasswordError,setPasswordFeedback ,clearSeedPhraseReducer, setDisabled, setIsSeedPhraseVerified , setConfirmPasswordFeedBack} = seedPhraseReducer.actions;

export default seedPhraseReducer.reducer;
