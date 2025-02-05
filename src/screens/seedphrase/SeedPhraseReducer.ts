import { createSlice } from '@reduxjs/toolkit';

export interface seedPhraseReducerType {
    password: string
    passwordError: string
    confirmPassword: string
    confirmPasswordError: string
    confirmPasswordFeedback: string
    passwordFeedback: string;
    words:string;
    isSeedPhraseVerified:boolean;
    disabled : boolean,
    wordsArray: []
    
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
    wordsArray: []
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

        setWords: (state, action) => {
            state.words = action.payload;
        },
        setWordsArray: (state, action) => {
            state.wordsArray = action.payload;
        },
        setDisabled: (state, action) => {
            state.disabled = action.payload;
        },
        setIsSeedPhraseVerified: (state, action) => {
            state.isSeedPhraseVerified = action.payload;
        },
        clearSeedPhraseReducer: () => initialState,

    },
});

// Action creators are generated for each case reducer function
export const { setPassword, setPasswordError, setWordsArray, setConfirmPassword, setConfirmPasswordError, setWords ,setPasswordFeedback ,clearSeedPhraseReducer, setDisabled, setIsSeedPhraseVerified , setConfirmPasswordFeedBack} = seedPhraseReducer.actions;

export default seedPhraseReducer.reducer;
