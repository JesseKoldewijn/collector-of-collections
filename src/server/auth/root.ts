import { Lucia } from "lucia";

import { env } from "@/env.mjs";
import { luciaAdapter } from "@/server/auth/adapter";
import { type User } from "@/server/db/schema/users";

export const lucia = new Lucia(luciaAdapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: env.NODE_ENV === "production",
    },
  },
});

export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
  fresh: boolean;
};

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<User, "id">;
  }
}
