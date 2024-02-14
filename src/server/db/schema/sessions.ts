import { datetime, varchar } from "drizzle-orm/mysql-core";

import { createTable } from "../utils";
import { userTable } from "./users";

export const sessionTable = createTable("session", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 36,
  })
    .notNull()
    .references(() => userTable.id),
  expiresAt: datetime("expires_at").notNull(),
});

export type Session = typeof sessionTable.$inferSelect;
