import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { isUserStudent } from "../util/user";
const Layout = () => {
  const url = useLocation().pathname;
  const { state, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (url === "/" && isLoggedIn) {
      navigate(isUserStudent(state.user) ? "/modules" : "/requests");
    }
  }, []);

  return (
    <div className="w-full">
      <NavBar />
      <div className="bg-[#FAFAFA] min-h-[calc(100vh-65px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
