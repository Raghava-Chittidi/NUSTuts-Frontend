import {Avatar} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

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
            className="cursor-pointer"
                showFallback
                src='https://images.unsplash.com/broken'
            />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
            <DropdownSection showDivider={true}>
                <DropdownItem key="profile" className="h-14 gap-2 ">
                    <p className="font-extrabold text-lg">{user.name}</p>
                    <p className="font-bold text-base">{user.role.userType === "student" ? "Student" : "Teaching Assistant"}</p>
                    <p className="font-semibold text-sm">{user.email}</p>
                </DropdownItem>
            </DropdownSection>
            <DropdownSection>
                <DropdownItem onClick={handleLogOutClick} key="logout" className="text-danger">Log Out</DropdownItem>
            </DropdownSection>
        </DropdownMenu>
        </Dropdown>
    );
}

export default AvatarDisplay;