import React, { useReducer } from 'react';
import { initialState, AuthReducer } from './reducer';

// Contexts
const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

// Hook Definitions
// State Hook
export function useAuthState() {
  const context = React.useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  };
  return context;
};

// Dispatch Hook
export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);

  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider")
  };
  return context;
};

// Provider
export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return(
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
