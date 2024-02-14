import Link from "next/link";

import { validateRequest } from "@/server/auth/handlers/validate-request";

import LoggedInNav from "./logged-in";
import LoggedOutNav from "./logged-out";

const NavBar = async () => {
  const { user } = await validateRequest();

  return (
    <div className="fixed inset-x-0 top-0 flex w-full items-center px-5 py-5">
      <Link href="/">Librarian</Link>

      <div className="ml-auto">
        {user ? <LoggedInNav user={user} /> : <LoggedOutNav />}
      </div>
    </div>
  );
};

export default NavBar;
