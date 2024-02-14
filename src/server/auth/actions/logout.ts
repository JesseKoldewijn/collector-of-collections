import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { validateRequest } from "@/server/auth/handlers/validate-request";
import type { ActionResult } from "@/server/auth/lib/Actions";
import { lucia } from "@/server/auth/root";

export const logoutAction = async (): Promise<ActionResult> => {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/login");
};
