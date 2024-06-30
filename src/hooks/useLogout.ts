import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch, setIsLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const logout = async () => {
    // dispatch logout action
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/logout`, {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch({ type: "LOGOUT" });
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return { logout };
};
