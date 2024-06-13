import { MdOutlineForum } from "react-icons/md";
import { TbFiles } from "react-icons/tb";
import { MdChecklist } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import SidebarButton from "./SidebarButton";
import ConsultationsMenu from "./ConsultationsMenu";

export function Sidebar() {
  const { isLoggingIn, isLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggingIn && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggingIn]);

  if (isLoggingIn || !isLoggedIn) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-2 pt-4 bg-white min-w-24 sm:min-w-64 rounded-lg space-y-1 min-h-[calc(100vh-65px)] border-r-1">
      <SidebarButton
        name="Discussion"
        icon={<MdOutlineForum className="mr-2" size={23} />}
      />
      <SidebarButton
        name="Files"
        icon={<TbFiles className="mr-2" size={23} />}
      />
      <ConsultationsMenu />
      <SidebarButton
        name="Attendance"
        icon={<MdChecklist className="mr-2" size={23} />}
      />
    </div>
  );
}
