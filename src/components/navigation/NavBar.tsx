import Link from "next/link";
import React from "react";

import AccountBadge from "../auth/AccountBadge";

const NavBar = async () => {
  return (
    <div className="fixed inset-x-0 top-0 flex w-full items-center px-5 py-5">
      <Link href="/">Librarian</Link>

      <div className="ml-auto">
        <AccountBadge />
      </div>
    </div>
  );
};

export default NavBar;
