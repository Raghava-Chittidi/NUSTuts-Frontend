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
  const TOKEN_EXPIRY_TIME = 15 * 60 * 1000;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  const sendRefreshRequest = async () => {
    try {
      setIsLoggingIn(true);
      const res = await axios.get(`${BASE_URL}/api/auth/refresh`, {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.data?.data) {
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
      sendRefreshRequest();
    } else {
      const timer = setTimeout(() => {
        setIsLoggedIn(false);
        setIsLoggingIn(true);
      }, TOKEN_EXPIRY_TIME);

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  console.log("AuthContext state: ", state);

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
