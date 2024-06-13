import { ReactNode } from "react";
import NavBar from "../components/NavBar";
const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="w-full">
      <NavBar />
      <div className="bg-[#FAFAFA] min-h-[calc(100vh-65px)]">{children}</div>
    </div>
  );
};

export default Layout;
