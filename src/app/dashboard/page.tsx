import React from "react";

import { validateRequest } from "@/server/auth/handlers/validate-request";
import {
  isAdminRouteCheck,
  isPrivateRouteCheck,
} from "@/server/auth/role-check-routes";

const DashboardPage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    isPrivateRouteCheck(user);
    return;
  } else {
    isAdminRouteCheck(user);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Dashboard - Welcome back {user.firstname}!
        </h1>
        <div className="flex gap-1">
          You are logged in as a <pre>{user.role}</pre>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
