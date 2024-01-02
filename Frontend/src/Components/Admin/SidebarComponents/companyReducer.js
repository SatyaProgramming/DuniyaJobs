// companyReducer.js
export const ActionTypes = {
    SET_COMPANIES: 'SET_COMPANIES',
    ACTIVATE_COMPANY: 'ACTIVATE_COMPANY',
    DEACTIVATE_COMPANY: 'DEACTIVATE_COMPANY',
    TOGGLE_COMPANY_STATUS: 'TOGGLE_COMPANY_STATUS',
  };
  
  export const companyReducer = (state, action) => {
    switch (action.type) {
      case ActionTypes.TOGGLE_COMPANY_STATUS:
        return {
          ...state,
          companies: state.companies.map((company) =>
            company.id === action.payload
              ? { ...company, status: company.status === 'active' ? 'inactive' : 'active' }
              : company
          ),
        };
      case ActionTypes.SET_COMPANIES:
        return { ...state, companies: action.payload };
      case ActionTypes.ACTIVATE_COMPANY:
      case ActionTypes.DEACTIVATE_COMPANY:
        return {
          ...state,
          companies: state.companies.map((company) =>
            company.id === action.payload
              ? { ...company, status: action.type === ActionTypes.ACTIVATE_COMPANY ? 'active' : 'inactive' }
              : company
          ),
        };
      default:
        return state;
    }
  };
  