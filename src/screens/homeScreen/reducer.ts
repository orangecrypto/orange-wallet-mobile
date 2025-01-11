export const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    companyWebsite: '',
    state: '',
    zipCode: '',
    workingFields: [],
    employees: '',
    wfhPolicy: '',
    planStartDate: new Date(),
    selectedPlan: '',
    numberOfUsers: 1,
    finalPrice: 0,
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_FIELD':
        return { ...state, [action.payload.field]: action.payload.value };
      case 'UPDATE_FINAL_PRICE':
        return { ...state, finalPrice: action.payload };
      default:
        return state;
    }
  };