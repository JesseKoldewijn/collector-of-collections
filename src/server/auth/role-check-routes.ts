import { type User } from "lucia";
import { redirect } from "next/navigation";

import { isAdmin } from "./role-checks";

export const isAdminRouteCheck = (user: User) => {
  const hasRole = isAdmin(user);

  if (!hasRole) {
    return redirect("/");
  }
};

export const isPrivateRouteCheck = (user: User | null) => {
  if (!user) {
    return redirect("/");
  }
};
