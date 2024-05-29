import { createContext, useReducer } from "react";

interface AuthState {
  user: any;
}

interface AuthAction {
  type: string;
  payload?: any;
}

export const AuthContext = createContext({});

export const authReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload
            };
        case "LOGOUT":
            return {
                user: null
            };
        default:
            return state;
    }
    
} 

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};