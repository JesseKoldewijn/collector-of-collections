import Link from "next/link";
import { redirect } from "next/navigation";

import { loginAction } from "@/server/auth/actions/login";
import { validateRequest } from "@/server/auth/handlers/validate-request";
import { Form } from "@/server/auth/lib/Form";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <h1>Sign in</h1>
        <Form action={loginAction}>
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
