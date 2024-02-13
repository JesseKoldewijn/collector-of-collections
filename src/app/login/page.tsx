import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Argon2id } from "oslo/password";

import { validateRequest } from "@/server/auth/handlers/validate-request";
import type { ActionResult } from "@/server/auth/lib/Actions";
import { Form } from "@/server/auth/lib/Form";
import { lucia } from "@/server/auth/root";
import { db } from "@/server/db/root";
import { userSchema } from "@/server/db/schemas";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <h1>Sign in</h1>
        <Form action={login}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              autoComplete="username"
              className="rounded-md border border-neutral-100 bg-transparent !outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              className="rounded-md border border-neutral-100 bg-transparent !outline-none"
            />
          </div>

          <button className="mb-2 rounded-md border-2 border-neutral-100 px-3 py-1">
            Continue
          </button>
        </Form>
        <Link href="/signup">Create an account</Link>
      </div>
    </main>
  );
}

async function login(_: unknown, formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
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
    .from(userSchema.userTable)
    .where(eq(userSchema.userTable.username, username))
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
  return redirect("/");
}
