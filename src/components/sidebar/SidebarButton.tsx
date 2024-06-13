import { Button } from "@nextui-org/react";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarButton = ({
  name,
  icon,
  route,
}: {
  name: string;
  icon: ReactNode;
  route?: string;
}) => {
  //   const url = use;
  const dest = route ? route : name.toLowerCase();
  const navigate = useNavigate();
  const url = useLocation().pathname;

  return (
    <Button
      className={`w-full flex justify-center sm:justify-start h-12 p-2 ${
        url.includes(dest) ? "bg-gray-200 text-blue-800" : "bg-white"
      } hover:bg-gray-200`}
      endContent={
        <span className="hidden sm:block font-semibold text-small">{name}</span>
      }
      onClick={() => navigate(dest)}
    >
      {icon}
    </Button>
  );
};

export default SidebarButton;
