import axios, { AxiosError } from "axios";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useLogout = () => {
  const { dispatch, setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Logs users out and redirects them to the homepage
  const logout = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch({ type: "LOGOUT" });
      setIsLoggedIn(false);
      navigate("/");
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
  };

  return { logout };
};
