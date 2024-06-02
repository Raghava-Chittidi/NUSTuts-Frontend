import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { isUserStudent } from "../util/user";
import Logout from "./Logout";

export default function NavBar() {
  const { user } = useAuthContext().state;
  const { logout } = useLogout();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuItems = ["Modules", "Current Tutorials"];

  const handleLogOutClick = () => {
    // Log out logic
    logout();
  };

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
        <NavbarBrand>
          <span className="font-bold text-inherit text-2xl flex items-center">
            <FaGraduationCap
              style={{ marginRight: 5, color: "rgb(23 37 84)" }}
            />
            <span className="text-blue-950">NUS</span>
            <span className="text-amber-600">TUTS</span>
          </span>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {isUserStudent(user) && (
        <>
          <NavbarItem>
            <Link color="foreground" href="#">
              Modules
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Current Tutorials
            </Link>
          </NavbarItem>
        </>)}
        {!isUserStudent(user) && (
          <NavbarItem>
            <Link color="foreground" href="#">
              Request
            </Link>
          </NavbarItem>)}
        <NavbarItem>
          <Logout />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
