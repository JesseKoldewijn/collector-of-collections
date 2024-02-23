import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

import { db } from "@/server/db/root";
import { userTable } from "@/server/db/schema/users";

import { lucia } from "../root";

export const loginAction = async (_: unknown, formData: FormData) => {
  "use server";
  const username = formData.get("username");

  const biometrics = formData.get("biometrics");

  const biometricsCapturing = biometrics === "capturing";
  const biometricsEmpty = biometrics === "" || biometrics === null;

  console.log({ biometrics, biometricsCapturing, biometricsEmpty });

  if (biometricsCapturing || !biometricsEmpty) {
    return {
      error: undefined,
    };
  }

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_.-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .execute();

  const extUser = existingUser?.at(0);

  if (!extUser) {
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await new Argon2id().verify(extUser.password, password);
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(extUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect("/dashboard");
};
