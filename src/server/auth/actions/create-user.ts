import { eq } from "drizzle-orm";
import generator from "generate-password";
import { generateId } from "lucia";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

import { db } from "@/server/db/root";
import { type UserRole, userTable } from "@/server/db/schema/users";

export const createUser = async (
  _: unknown,
  formData: FormData,
  returnData = false,
) => {
  "use server";
  const username = formData.get("username");
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  let password = formData.get("password");
  let role = formData.get("role");

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

  if (typeof role !== "string" || (role !== "admin" && role !== "user")) {
    console.log("Invalid role", role);
    if (!role) {
      role = "user";
    } else {
      return {
        error: "Invalid role",
      };
    }
  }

  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      uppercase: true,
    });
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
        role: (role as UserRole) ?? "user",
      })
      .execute();
  } catch (e) {
    return {
      error: "An unknown error occurred",
    };
  }

  if (returnData) {
    return {
      data: {
        success: true,
        userData: {
          firstname,
          lastname,
          username,
          password,
          hashedPassword,
          role,
        },
      },
    };
  }
  return redirect("/admin/users");
};
