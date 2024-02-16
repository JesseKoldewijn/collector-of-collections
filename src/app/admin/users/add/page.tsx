import Link from "next/link";

import InputSelect from "@/components/form/InputSelect";
import InputText from "@/components/form/InputText";
import { createUser } from "@/server/auth/actions/create-user";
import { validateRequest } from "@/server/auth/handlers/validate-request";
import { Form } from "@/server/auth/lib/Form";
import {
  isAdminRouteCheck,
  isPrivateRouteCheck,
} from "@/server/auth/role-check-routes";

const AdminUsersPage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    isPrivateRouteCheck(user);
    return;
  } else {
    isAdminRouteCheck(user);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Admin - Users - Add
        </h1>

        <div className="flex w-full max-w-md flex-col items-center justify-center gap-8">
          <Form
            action={createUser}
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

            <InputSelect
              inputName="role"
              inputLabel="Role"
              inputDefaultValue="user"
              inputOptions={[
                {
                  label: "User",
                  value: "user",
                },
                {
                  label: "Admin",
                  value: "admin",
                },
              ]}
              autocompleteName="user-role"
              className="pb-4"
            />

            <button className="mb-2 rounded-md border-2 border-neutral-100 px-3 py-1">
              Continue
            </button>
          </Form>
          <Link href="/admin/users">Back</Link>
        </div>
      </div>
    </main>
  );
};
export default AdminUsersPage;
