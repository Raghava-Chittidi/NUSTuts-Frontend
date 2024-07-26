import { Button } from "@nextui-org/button";
import { useLogout } from "../hooks/useLogout";

const Logout = () => {
  const { logout } = useLogout();

  return (
    <Button onClick={logout} color="primary" variant="solid">
      Log Out
    </Button>
  );
};

export default Logout;
