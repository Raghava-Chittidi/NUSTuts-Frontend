import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useStudentSignup = () => {
  const [isSignUpLoading, setIsSignUpLoading] = useState<boolean | null>(null);
  const { dispatch, setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const signup = async (
    name: string,
    email: string,
    password: string,
    modules: string[]
  ) => {
    setIsSignUpLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/student/signup`,
        {
          Name: name,
          Email: email,
          Password: password,
          Modules: modules,
        },
        { withCredentials: true }
      );
      dispatch({ type: "LOGIN", payload: response.data.data });
      setIsLoggedIn(true);
      navigate("/modules");
    } catch (error) {
      let message = "";
      if (error instanceof AxiosError) {
        message = error.response?.data.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      if (message) {
        toast.error(message.charAt(0).toUpperCase() + message.slice(1));
      }
    }

    setIsSignUpLoading(false);
  };
  return { signup, isSignUpLoading };
};
