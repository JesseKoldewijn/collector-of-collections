import { sql } from "drizzle-orm";
import { datetime, timestamp, varchar } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from "uuid";

import { createTable } from "../utils";

export const userTable = createTable("user", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`UUID()`)
    .$defaultFn(() => uuidv4()),
  username: varchar("username", {
    length: 50,
  }).notNull(),
  password: varchar("password", {
    length: 255,
  }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});

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

export type User = typeof userTable.$inferSelect;
export type Session = typeof sessionTable.$inferSelect;
