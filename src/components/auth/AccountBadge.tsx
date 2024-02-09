import { SignInButton, SignOutButton, SignUpButton, auth } from "@clerk/nextjs";

const AccountBadge = async () => {
  const { userId } = auth();

  if (!!userId) {
    return (
      <div className="flex items-center justify-center gap-2">
        <div className="flex h-10 items-center">
          <SignOutButton>
            <div
              role="button"
              className="cursor-pointer rounded-md border-2 px-2 py-1"
            >
              Logout
            </div>
          </SignOutButton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex h-10 items-center">
        <SignInButton mode="modal">
          <div role="button" className="rounded-md border-2 px-2 py-1">
            Login
          </div>
        </SignInButton>
      </div>
      <div className="flex h-10 items-center">
        <SignUpButton mode="modal">
          <div role="button" className="rounded-md border-2 px-2 py-1">
            Register
          </div>
        </SignUpButton>
      </div>
    </div>
  );
};

export default AccountBadge;
