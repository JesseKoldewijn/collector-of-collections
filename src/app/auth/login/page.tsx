import Link from "next/link";
import { redirect } from "next/navigation";

import InputText from "@/components/form/InputText";
import { loginAction } from "@/server/auth/actions/login";
import { validateRequest } from "@/server/auth/handlers/validate-request";
import { Form } from "@/server/auth/lib/Form";

const Page = async () => {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <h1>Login</h1>
        <Form
          action={loginAction}
          className="flex w-full max-w-sm flex-col gap-2 rounded-md border-2 border-neutral-100 px-4 py-2"
        >
          <InputText
            inputName="username"
            inputLabel="Username"
            autocompleteName="username"
          />

          <InputText
            inputName="password"
            inputLabel="Password"
            inputType="password"
            autocompleteName="current-password"
          />

          <button className="mt-2 rounded-md border-2 border-neutral-100 px-3 py-1">
            Continue
          </button>
        </Form>
        <Link href="/signup">Sign Up</Link>
      </div>
    </main>
  );
};
export default Page;
