import { createSlice } from '@reduxjs/toolkit';

export interface FormReducerType {
    firstName: string;
    lastName: string
    email: string
    companyName: string
    companyWebsite: string
    zipCode: string
 
}

const initialState: FormReducerType = {
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    companyWebsite: '',
    zipCode: ''
};

export const formReducer = createSlice({
    initialState,
    name: 'formReducer',
    reducers: {
        setFirstName: (state, action) => {
            state.firstName =action.payload
        },
        setLastName : (state, action ) => {
            state.lastName =action.payload
        },
        setEmail : (state, action ) => {
            state.email =action.payload
        },
        setCompanyName : (state, action ) => {
            state.companyName =action.payload
        },
        setCompanyWebsite : (state, action ) => {
            state.companyWebsite =action.payload
        },
        setZipcode : (state, action ) => {
            state.zipCode =action.payload
        }


    },
});

// Action creators are generated for each case reducer function
export const { setFirstName, setLastName, setEmail, setCompanyName, setCompanyWebsite, setZipcode } = formReducer.actions;

export default formReducer.reducer;
