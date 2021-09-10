export const initialState = {
  user: '',
  authenticated: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return{
        ...initialState,
        errorMessage: null
      }
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        authenticated: action.payload.authenticated,
        errorMessage: null
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: '',
        authenticated: false,
        errorMessage: null
      };
    case 'LOGIN_ERROR':
      return {
        ...initialState,
        authenticated: false,
        errorMessage: action.error
      };
    default: 
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

