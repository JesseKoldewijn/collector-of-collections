import { type User } from "lucia";

import { logoutAction } from "@/server/auth/actions/logout";
import { Form } from "@/server/auth/lib/Form";

type LoggedInNavProps = {
  user: User;
};

const LoggedInNav = async ({ user }: LoggedInNavProps) => {
  return (
    <div className="flex items-center gap-6">
      <span>{user.username}</span>
      <Form action={logoutAction}>
        <button className="rounded-md border border-neutral-100 px-2 py-1">
          Logout
        </button>
      </Form>
    </div>
  );
};

export default LoggedInNav;
