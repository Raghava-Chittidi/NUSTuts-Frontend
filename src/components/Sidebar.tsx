import { Button } from "@nextui-org/react";
import { MdOutlineForum } from "react-icons/md";
import { TbFiles } from "react-icons/tb";
import { MdDateRange } from "react-icons/md";
import { MdChecklist } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const MENU = [
    {
      name: "Discussion",
      icon: <MdOutlineForum className="mr-2" size={23} />,
    },
    {
      name: "Files",
      icon: <TbFiles className="mr-2" size={23} />,
    },
    {
      name: "Consultations",
      icon: <MdDateRange className="mr-2" size={23} />,
    },
    {
      name: "Attendance",
      icon: <MdChecklist className="mr-2" size={23} />,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="p-2 bg-white min-w-24 sm:min-w-60 rounded-lg space-y-1 min-h-[calc(100vh-65px)] border-r-1">
      {MENU.map((menuItem, index) => (
        <Button
          key={index}
          className={`w-full flex justify-center sm:justify-start font-semibold ${
            window.location.pathname.includes(menuItem.name.toLowerCase())
              ? "bg-gray-200 text-blue-800"
              : "bg-white"
          } hover:bg-gray-200`}
          endContent={<span className="hidden sm:block">{menuItem.name}</span>}
          onClick={() => {
            navigate(menuItem.name.toLowerCase());
          }}
        >
          {menuItem.icon}
        </Button>
      ))}
    </div>
  );
}

<Sidebar />;
