import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { useAuthContext } from "../hooks/useAuthContext";
import { isUserStudent } from "../util/user";
import AvatarDisplay from "./avatar/AvatarDisplay";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { user } = useAuthContext().state;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const studentNavHeaders = [
    <div
      onClick={() => {
        setIsMenuOpen(false);
        navigate("/modules");
      }}
    >
      Modules
    </div>,
  ];
  const teachingAssistantNavHeaders = [
    <div
      onClick={() => {
        setIsMenuOpen(false);
        navigate(`/tutorial/${user.tutorial?.ID}`);
      }}
    >
      Tutorial
    </div>,
    <div
      onClick={() => {
        setIsMenuOpen(false);
        navigate("/requests");
      }}
    >
      Requests
    </div>,
  ];

  return (
    <Navbar
      maxWidth="full"
      className="border-b-1 border-b-gray-200"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="cursor-pointer">
          <div
            onClick={() =>
              navigate(isUserStudent(user) ? "/modules" : "/requests")
            }
          >
            <span className="font-bold text-inherit text-2xl flex items-center">
              <FaGraduationCap
                style={{ marginRight: 5, color: "rgb(23 37 84)" }}
              />
              <span className="text-blue-950">NUS</span>
              <span className="text-amber-600">TUTS</span>
            </span>
          </div>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {isUserStudent(user)
          ? studentNavHeaders.map((header, index) => (
              <NavbarItem className="cursor-pointer" key={index}>
                {header}
              </NavbarItem>
            ))
          : teachingAssistantNavHeaders.map((header, index) => (
              <NavbarItem className="cursor-pointer" key={index}>
                {header}
              </NavbarItem>
            ))}
        <NavbarItem>
          <AvatarDisplay />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {isUserStudent(user)
          ? studentNavHeaders.map((header, index) => (
              <NavbarMenuItem className="cursor-pointer" key={index}>
                {header}
              </NavbarMenuItem>
            ))
          : teachingAssistantNavHeaders.map((header, index) => (
              <NavbarMenuItem className="cursor-pointer" key={index}>
                {header}
              </NavbarMenuItem>
            ))}
      </NavbarMenu>
    </Navbar>
  );
}
