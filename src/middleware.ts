import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth: async (user, req) => {
    const isLoggedIn = user.userId;
    const isPubPath = user.isPublicRoute || req.url === "/";

    if (!isLoggedIn && !isPubPath) {
      const origin = new URL(req.url).origin;
      const redirectUrl = `${origin}/`;
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
