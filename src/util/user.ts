import { User } from "../types";

export const isUserStudent = (user: User) => {
    return user.role.userType === "student";
}

export const getUserType = (user: User) => {
    return user.role.userType;
}