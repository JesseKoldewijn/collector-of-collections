import { type User } from "lucia";

export const isAdmin = (user: User) => {
  const role = user.role;
  return role === "admin";
};
