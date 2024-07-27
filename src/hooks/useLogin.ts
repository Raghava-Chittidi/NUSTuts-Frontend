import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogin = (userType: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch, setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Logs users in, based on their user type
  const login = async (email: string, password: string) => {
    setIsLoading(true);

    const url =
      userType === "Student"
        ? `${BASE_URL}/api/auth/student/login`
        : `${BASE_URL}/api/auth/teachingAssistant/login`;

    try {
      const response = await axios.post(
        url,
        {
          Email: email,
          Password: password,
        },
        { withCredentials: true }
      );

      dispatch({ type: "LOGIN", payload: response.data.data });
      setIsLoggedIn(true);

      // Redirects them to their homepage, based on the user type
      if (userType == "Student") {
        navigate("/modules");
      } else {
        navigate("/requests");
      }
    } catch (error: unknown) {
      let message = "";
      if (error instanceof AxiosError) {
        message = error.response?.data.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      // Display error message as a toast
      if (message) {
        toast.error(message.charAt(0).toUpperCase() + message.slice(1));
      }
    }

    setIsLoading(false);
  };
  return { login, isLoading };
};
