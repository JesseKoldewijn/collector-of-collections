import { sql } from "drizzle-orm";
import { index, timestamp, varchar } from "drizzle-orm/mysql-core";
import { v4 as uuidv4 } from "uuid";

import { createTable } from "../utils";
import { userTable } from "./users";

export const collections = createTable(
  "collections",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .default(sql`UUID()`)
      .$defaultFn(() => uuidv4()),
    name: varchar("name", { length: 256 }).notNull(),
    desc: varchar("desc", { length: 500 }),
    userId: varchar("user_id", {
      length: 36,
    })
      .notNull()
      .references(() => userTable.id),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (x) => ({
    nameIndex: index("name_idx").on(x.name),
    // userIdIndex: index("user_id_idx").on(x.userId),
  }),
);

export type Collection = typeof collections.$inferSelect;
