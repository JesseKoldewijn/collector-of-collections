import Link from "next/link";
import { redirect } from "next/navigation";

import InputPasswordConfirm from "@/components/form/InputPasswordConfirm";
import InputText from "@/components/form/InputText";
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
          <InputText
            inputName="firstname"
            inputLabel="First Name"
            autocompleteName="given-name"
          />

          <InputText
            inputName="lastname"
            inputLabel="Last Name"
            autocompleteName="family-name"
          />

          <InputText
            inputName="username"
            inputLabel="Username"
            autocompleteName="current-username"
          />

          <InputText
            inputName="password"
            inputLabel="Password"
            inputType="password"
            autocompleteName="current-password"
          />
          <InputPasswordConfirm
            inputName="password-confirm"
            inputLabel="Confirm Password"
            autocompleteName="current-password"
          />

          <button className="mb-2 rounded-md border-2 border-neutral-100 px-3 py-1">
            Continue
          </button>
        </Form>
        <Link href="/login">Login</Link>
      </div>
    </main>
  );
};

export default page;
