import { sql } from "drizzle-orm";
import { customType, timestamp, varchar } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from "uuid";

import { createTable } from "../utils";

export type UserRole = "user" | "admin";

const userRole = customType<{ data: UserRole }>({
  dataType() {
    return "text";
  },
});

export const userTable = createTable("user", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .default(sql`UUID()`)
    .$defaultFn(() => uuidv4()),
  firstname: varchar("firstname", {
    length: 100,
  }).notNull(),
  lastname: varchar("lastname", {
    length: 100,
  }).notNull(),
  username: varchar("username", {
    length: 50,
  }).notNull(),
  password: varchar("password", {
    length: 255,
  }).notNull(),
  role: userRole("role").default("user").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow(),
});

export type User = typeof userTable.$inferSelect;
