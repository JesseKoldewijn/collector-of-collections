import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

import { lucia } from "@/server/auth/root";
import { db } from "@/server/db/root";
import { userTable } from "@/server/db/schema/users";

export const signupAction = async (_: unknown, formData: FormData) => {
  "use server";
  const username = formData.get("username");
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");

  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
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

  if (
    typeof firstname !== "string" ||
    firstname.length < 1 ||
    firstname.length > 50
  ) {
    return {
      error: "Invalid firstname",
    };
  }

  if (
    typeof lastname !== "string" ||
    lastname.length < 1 ||
    lastname.length > 50
  ) {
    return {
      error: "Invalid lastname",
    };
  }

  const password = formData.get("password");
  const passwordConfirm = formData.get("password-confirm");

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  if (
    typeof passwordConfirm !== "string" ||
    passwordConfirm.length < 6 ||
    passwordConfirm.length > 255
  ) {
    return {
      error: "Password confirmation is invalid",
    };
  }

  if (password !== passwordConfirm) {
    return {
      error: "Passwords do not match",
    };
  }

  const userExist =
    (await db.select().from(userTable).where(eq(userTable.username, username)))
      .length > 0;
  if (userExist) {
    return {
      error: "Username is already taken",
    };
  }

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    await db
      .insert(userTable)
      .values({
        id: userId,
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: hashedPassword,
      })
      .execute();

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (e) {
    return {
      error: "An unknown error occurred",
    };
  }
  return redirect("/dashboard");
};
