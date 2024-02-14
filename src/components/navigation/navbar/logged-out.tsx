import Link from "next/link";

const LoggedOutNav = async () => {
  return (
    <>
      <Link href="/auth/login">Sign in</Link>
    </>
  );
};

export default LoggedOutNav;
