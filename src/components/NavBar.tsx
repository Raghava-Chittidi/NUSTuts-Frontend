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
  const menuItems = ["Modules", "Current Tutorials"];

  // Only should see modules and current tutorials after student is logged in
  return (
    <Navbar
      maxWidth="full"
      className="border-b-1 border-b-gray-200"
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
        {isUserStudent(user) && (
          <>
            <NavbarItem className="cursor-pointer">
              <div onClick={() => navigate("/modules")}>Modules</div>
            </NavbarItem>
          </>
        )}
        {!isUserStudent(user) && (
          <>
            <NavbarItem className="cursor-pointer">
              <div onClick={() => navigate(`/tutorial/${user.tutorial?.ID}`)}>
                Tutorial
              </div>
            </NavbarItem>
            <NavbarItem className="cursor-pointer">
              <div onClick={() => navigate("/requests")}>Requests</div>
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          <AvatarDisplay />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <div onClick={() => {}}>{item}</div>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
