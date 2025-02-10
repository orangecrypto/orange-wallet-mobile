import { createSlice } from '@reduxjs/toolkit';

export interface loginReducerType {
   password: string;
   passwordError: string;
   passwordFeedback: string;
}

const initialState: loginReducerType = {
    password: '',
    passwordError: '',
    passwordFeedback: ''
};

export const loginReducer = createSlice({
    initialState,
    name: 'loginReducer',
    reducers: {
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setPasswordError: (state, action) => {
            state.passwordError = action.payload;
        },
        setPasswordFeedback: (state, action) => {
            state.passwordFeedback = action.payload;
        },
        clearLoginReducer: () => initialState, // Corrected this line to return the initialState directly
    },
});

// Action creators are generated for each case reducer function
export const { setPassword, setPasswordError, setPasswordFeedback, clearLoginReducer } = loginReducer.actions;

export default loginReducer.reducer;
