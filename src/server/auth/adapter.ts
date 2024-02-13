import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from "../db/root";
import { sessionTable, userTable } from "../db/schema/users";

export const luciaAdapter = new DrizzleMySQLAdapter(
  db,
  sessionTable,
  userTable,
);
