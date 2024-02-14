import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from "@/server/db/root";
import { sessionTable } from "@/server/db/schema/sessions";
import { userTable } from "@/server/db/schema/users";

export const luciaAdapter = new DrizzleMySQLAdapter(
  db,
  sessionTable,
  userTable,
);
