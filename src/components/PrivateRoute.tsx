import { ReactNode } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";
import { getUserType } from "../util/user";

const PrivateRoute = ({ children, userType }: { children: ReactNode, userType?: string }) => {
    const user = useAuthContext().state.user; 

    const userTypeMatches = userType && user ? getUserType(user) === userType : user;
    return user && userTypeMatches ? children : <Navigate to="/" />;
};

export default PrivateRoute;