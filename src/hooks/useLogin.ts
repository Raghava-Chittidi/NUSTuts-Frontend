import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = (userType: string) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch, setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const url =
      userType === "Student"
        ? "/api/auth/student/login"
        : "/api/auth/teachingAssistant/login";

    try {
      const response = await axios.post(url, {
        Email: email,
        Password: password,
      });

      dispatch({ type: "LOGIN", payload: response.data.data });
      setIsLoggedIn(true);
      if (userType == "Student") {
        navigate("/modules");
      } else {
        navigate("/requests");
      }
    } catch (error: unknown) {
      console.log("error: ", error);
      if (error instanceof AxiosError) {
        setError(error.response?.data.message || error.message);
      } else if (error instanceof Error) {
        setError(error.message);
      }
    }

    setIsLoading(false);
  };
  return { login, isLoading, error };
};
