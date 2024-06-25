import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useStudentSignup = () => {
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [isSignUpLoading, setIsSignUpLoading] = useState<boolean | null>(null);
  const { dispatch, setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (
    name: string,
    email: string,
    password: string,
    modules: string[]
  ) => {
    setIsSignUpLoading(true);
    setSignUpError(null);

    try {
      const response = await axios.post(`/api/auth/student/signup`, {
        Name: name,
        Email: email,
        Password: password,
        Modules: modules,
      });
      dispatch({ type: "LOGIN", payload: response.data.data });
      setIsLoggedIn(true);
      navigate("/modules");
    } catch (error: unknown) {
      console.log("error: ", error);
      if (error instanceof AxiosError) {
        setSignUpError(error.response?.data.message || error.message);
      } else if (error instanceof Error) {
        setSignUpError(error.message);
      }
    }

    setIsSignUpLoading(false);
  };
  return { signup, isSignUpLoading, signUpError };
};
