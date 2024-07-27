import { User } from "../types";

// Checks if user is a student
// True if user is a student, false if user is a teaching assistant
export const isUserStudent = (user: User) => {
  return user && user.role.userType === "student";
};

// Checks if user matches the userType
export const isCorrectUser = (user: User, userType: string) => {
  if (!user) {
    return false;
  }

  return user.role.userType === userType;
};
