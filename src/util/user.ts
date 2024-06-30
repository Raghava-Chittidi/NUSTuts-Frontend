import { User } from "../types";

export const isUserStudent = (user: User) => {
  return user && user.role.userType === "student";
};

// export const getUserType = (user: User) => {
//   return user.role.userType;
// };

export const isCorrectUser = (user: User, userType: string) => {
  if (!user) {
    return false;
  }

  return user.role.userType === userType;
};
