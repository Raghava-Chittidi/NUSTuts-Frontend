import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch, setIsLoggedIn } = useAuthContext();

  const logout = async () => {
    // dispatch logout action
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch({ type: "LOGOUT" });
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  return { logout };
};
