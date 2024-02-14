import Link from "next/link";
import { redirect } from "next/navigation";

import { signupAction } from "@/server/auth/actions/signup";
import { validateRequest } from "@/server/auth/handlers/validate-request";
import { Form } from "@/server/auth/lib/Form";

const page = async () => {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <h1>Sign Up</h1>
        <Form
          action={signupAction}
          className="flex w-full max-w-sm flex-col gap-2 rounded-md border-2 border-neutral-100 px-4 py-2"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="firstname">First Name</label>
            <input
              name="firstname"
              id="firstname"
              autoComplete="given-name"
              className="rounded-md border border-neutral-100 bg-transparent px-2 !outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lastname">Last Name</label>
            <input
              name="lastname"
              id="lastname"
              autoComplete="family-name"
              className="rounded-md border border-neutral-100 bg-transparent px-2 !outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              autoComplete="username"
              className="rounded-md border border-neutral-100 bg-transparent px-2 !outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              className="rounded-md border border-neutral-100 bg-transparent px-2 !outline-none"
            />
          </div>

          <button className="mb-2 rounded-md border-2 border-neutral-100 px-3 py-1">
            Continue
          </button>
        </Form>
        <Link href="/auth/login">Login</Link>
      </div>
    </main>
  );
};

export default page;
