import { createContext, useEffect, useReducer, useState } from "react";
import { Tutorial, User } from "../types";
import axios from "axios";

export interface AuthenticatedUser extends User {
  modules?: string[];
  tutorials?: Tutorial[];
  tutorial?: Tutorial;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

interface AuthState {
  user: AuthenticatedUser;
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface AuthContextInterface {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggingIn: boolean;
  setIsLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;
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
  // Access token is valid only for 15mins
  const TOKEN_EXPIRY_TIME = 15 * 60 * 1000;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const sendRefreshRequest = async () => {
    try {
      setIsLoggingIn(true);
      const res = await axios.get(`${BASE_URL}/api/auth/refresh`, {
        withCredentials: true,
      });
      if (res.data?.data) {
        // Login
        dispatch({ type: "LOGIN", payload: res.data.data });
        setIsLoggedIn(true);
      }
      setIsLoggingIn(false);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      // Send request to refresh auth status
      sendRefreshRequest();
    } else {
      // Auto log out user after 15mins
      const timer = setTimeout(() => {
        setIsLoggedIn(false);
        setIsLoggingIn(true);
      }, TOKEN_EXPIRY_TIME);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        isLoggedIn,
        setIsLoggedIn,
        isLoggingIn,
        setIsLoggingIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
