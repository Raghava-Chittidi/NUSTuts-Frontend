import { Button } from "@nextui-org/button";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { logout } = useLogout();
  
    const handleLogOutClick = () => {
      // Log out logic
      logout();
    };

    return (
        <Button onClick={handleLogOutClick} color="primary" variant="solid">
            Log Out
        </Button>
    );
};

export default Logout;