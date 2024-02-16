import { eq } from "drizzle-orm";
import Link from "next/link";

import UserLister from "@/components/listers/userlister/List";
import { validateRequest } from "@/server/auth/handlers/validate-request";
import {
  isAdminRouteCheck,
  isPrivateRouteCheck,
} from "@/server/auth/role-check-routes";
import { db } from "@/server/db/root";
import { userTable } from "@/server/db/schema/users";

const AdminUsersPage = async () => {
  const { user } = await validateRequest();
  if (!user) {
    isPrivateRouteCheck(user);
    return;
  } else {
    isAdminRouteCheck(user);
  }

  const users = await db
    .select()
    .from(userTable)
    .where(eq(userTable.role, "user"));

  const admins = await db
    .select()
    .from(userTable)
    .where(eq(userTable.role, "admin"));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Admin - Users
        </h1>

        <div className="flex w-full max-w-md flex-col items-center justify-center gap-8">
          <div className="flex w-full flex-col gap-4 rounded-md border border-neutral-100 px-3 py-2">
            <strong>Actions</strong>
            <div className="flex gap-4 pb-2">
              <Link
                href="/admin/users/add"
                className="text-sm text-neutral-100 hover:text-neutral-300"
              >
                Add User
              </Link>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 rounded-md border border-neutral-100 px-3 py-2">
            <strong>Users</strong>
            <UserLister users={users} />
          </div>

          <div className="flex w-full flex-col gap-4 rounded-md border border-neutral-100 px-3 py-2">
            <strong>Admins</strong>
            <UserLister users={admins} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default AdminUsersPage;
