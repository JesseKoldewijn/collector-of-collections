import { redirect } from "next/navigation";
import React from "react";

import { validateRequest } from "@/server/auth/handlers/validate-request";

const page = async () => {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/");
  }
  const userRole = user.role;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Dashboard - Welcome back {user.firstname}!
        </h1>
        <div className="flex gap-1">
          You are logged in as a <pre>{userRole}</pre>
        </div>
      </div>
    </main>
  );
};

export default page;
