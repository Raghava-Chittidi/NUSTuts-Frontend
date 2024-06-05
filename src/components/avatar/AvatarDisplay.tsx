import { Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { strToColour } from "../../util/util";

const AvatarDisplay = () => {
  const { user } = useAuthContext().state;
  const { logout } = useLogout();

  const handleLogOutClick = () => {
    // Log out logic
    logout();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          name={user.name.charAt(0).toUpperCase()}
          style={{ backgroundColor: strToColour(user.name) }}
          color="primary"
          className="cursor-pointer text-xl"
          showFallback
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownSection showDivider={true}>
          <DropdownItem textValue="profile" key="profile" className="h-16">
            <p className="font-extrabold text-lg">{user.name}</p>
            <p className="font-bold text-xs">
              {user.role.userType === "student"
                ? "Student"
                : "Teaching Assistant"}
            </p>
            <p className="font-semibold text-xs">{user.email}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            onClick={handleLogOutClick}
            key="logout"
            className="text-danger"
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default AvatarDisplay;
