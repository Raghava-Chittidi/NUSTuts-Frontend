import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { useAuthContext } from "../hooks/useAuthContext";
import { isUserStudent } from "../util/user";
import AvatarDisplay from "./avatar/AvatarDisplay";

export default function NavBar() {
  const { user } = useAuthContext().state;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
        <NavbarBrand>
          <Link href="/">
            <span className="font-bold text-inherit text-2xl flex items-center">
              <FaGraduationCap
                style={{ marginRight: 5, color: "rgb(23 37 84)" }}
              />
              <span className="text-blue-950">NUS</span>
              <span className="text-amber-600">TUTS</span>
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {isUserStudent(user) && (
          <>
            <NavbarItem>
              <Link color="foreground" href="/modules">
                Modules
              </Link>
            </NavbarItem>
          </>
        )}
        {!isUserStudent(user) && (
          <NavbarItem>
            <Link color="foreground" href="/requests">
              Requests
            </Link>
          </NavbarItem>
        )}
        <NavbarItem>
          <AvatarDisplay />
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
