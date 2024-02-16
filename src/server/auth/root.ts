import { Lucia, TimeSpan } from "lucia";

import { env } from "@/env.mjs";
import { luciaAdapter } from "@/server/auth/adapter";
import { type User } from "@/server/db/schema/users";

export const lucia = new Lucia(luciaAdapter, {
  sessionExpiresIn: new TimeSpan(1, "w"),
  sessionCookie: {
    expires: true,
    attributes: {
      secure: env.NODE_ENV === "production",
      sameSite: "strict",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      firstname: attributes.firstname,
      lastname: attributes.lastname,
      role: attributes.role,
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
