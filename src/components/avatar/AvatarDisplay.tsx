import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { strToColour } from "../../util/util";
import { useNavigate } from "react-router-dom";

const AvatarDisplay = () => {
  const { user } = useAuthContext().state;
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleLogOutClick = () => {
    // Log out logic
    logout();
  };

  if (!user) {
    navigate("/");
    return;
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform text-xl text-white"
          name={user.name.charAt(0).toUpperCase()}
          style={{ backgroundColor: strToColour(user.name) }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" textValue="user" className="h-14 gap-2">
          <p className="font-semibold">
            {user.role.userType === "student"
              ? "Student"
              : "Teaching Assistant"}
          </p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={handleLogOutClick}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AvatarDisplay;
