import { ReactNode } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import { isCorrectUser } from "../util/user";

const PrivateRoute = ({
  children,
  userType,
}: {
  children: ReactNode;
  userType?: string;
}) => {
  const user = useAuthContext().state.user;
  const userTypeMatches = userType && isCorrectUser(user, userType);
  return userTypeMatches ? children : <Navigate to="/" />;
};

export default PrivateRoute;
