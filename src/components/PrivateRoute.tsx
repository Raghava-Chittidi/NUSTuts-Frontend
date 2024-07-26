import { ReactNode } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import { isCorrectUser, isUserStudent } from "../util/user";

/* 
  Prevents Students from being able to visit the requests route which only Teaching Assistants are
  supposed to see. Prevents Teaching Assistants from being able to visit the modules routes which 
  only Students are supposed to see
*/
const PrivateRoute = ({
  children,
  userType,
}: {
  children: ReactNode;
  userType?: string;
}) => {
  const user = useAuthContext().state.user;
  const userTypeMatches = userType && isCorrectUser(user, userType);
  return userTypeMatches ? (
    children
  ) : isUserStudent(user) ? (
    <Navigate to="/modules" />
  ) : (
    <Navigate to="/requests" />
  );
};

export default PrivateRoute;
