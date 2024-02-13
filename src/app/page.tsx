import { validateRequest } from "@/server/auth/handlers/validate-request";

const Home = async () => {
  const { user, session } = await validateRequest();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight">Hello World</h1>
        <span className="flex flex-col items-center justify-center gap-2">
          {user
            ? `Welcome back, ${user.id}`
            : "You are not logged in. Please sign in."}
          <hr className="w-full" />
          {session
            ? `Session expires at: ${session.expiresAt.toISOString()}`
            : "No session found."}
        </span>
      </div>
    </main>
  );
};
export default Home;
