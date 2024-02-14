import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

import { env } from "@/env.mjs";

import * as CollectionSchema from "./schema/collections";
import * as SessionSchema from "./schema/sessions";
import * as UserSchema from "./schema/users";

const conn = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export const db = drizzle(conn, {
  mode: "default",
  schema: {
    ...CollectionSchema,
    ...SessionSchema,
    ...UserSchema,
  },
});
