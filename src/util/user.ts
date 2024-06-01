import { User } from "../types";

export const isUserStudent = (user: User) => {
    return user.role.userType === "student";
}