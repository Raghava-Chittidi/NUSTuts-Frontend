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

export default function NavBar() {
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
        <NavbarItem>
          <Button onClick={handleLogOutClick} color="primary" variant="solid">
            Log Out
          </Button>
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
