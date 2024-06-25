import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
const Layout = () => {
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
