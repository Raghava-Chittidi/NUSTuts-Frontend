import { ReactNode } from "react";
import NavBar from "../components/NavBar";
const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="w-full">
      <NavBar />
      <div className="bg-slate-100 min-h-[calc(100vh-65px)] flex justify-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
