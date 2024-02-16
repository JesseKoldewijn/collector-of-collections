import { eq } from "drizzle-orm";

import { createUser } from "@/server/auth/actions/create-user";

import { db } from "../root";
import { userTable } from "../schema/users";

export const seedSuperUser = async (superUser: {
  username: string;
  password: string;
}) => {
  const user = {
    username: superUser.username,
    password: superUser.password,
  };

  console.log("Checking if specific super user exists...");

  const existUser = await db
    .selectDistinct()
    .from(userTable)
    .where(eq(userTable.username, user.username))
    .execute();

  if (existUser.length > 0) {
    throw new Error("Super user already exists!");
  }

  console.log("Seeding super user...");

  const formData = new FormData();
  formData.append("username", user.username.trim().replaceAll(" ", ""));
  formData.append("firstname", "Super");
  formData.append("lastname", "User");
  formData.append("password", user.password.trim().replaceAll(" ", ""));
  formData.append("role", "admin");

  const res = await createUser(null, formData);

  if (!res.data?.success) {
    throw new Error("Failed to seed super user!");
  }

  console.log("Super user seeded!");
};
