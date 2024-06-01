import { createContext, useEffect, useReducer } from "react";
import { Tutorial, User } from "../types";

export interface AuthenticatedUser extends User {
  modules?: string[];
  tutorials?: Tutorial[];
  tutorial?: Tutorial;
}

interface AuthState {
  user: AuthenticatedUser;
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface AuthContextInterface {
  state: AuthState;
  dispatch: (action: AuthAction) => void;
}

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const userString = localStorage.getItem("user");
    console.log("userString: ", userString);
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
