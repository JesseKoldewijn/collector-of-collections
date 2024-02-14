import { Lucia } from "lucia";

import { env } from "@/env.mjs";
import { luciaAdapter } from "@/server/auth/adapter";
import { type User } from "@/server/db/schema/users";

export const lucia = new Lucia(luciaAdapter, {
  sessionCookie: {
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      createdAt: attributes.createdAt,
    };
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
    DatabaseUserAttributes: Omit<Omit<User, "id">, "password">;
  }
}
