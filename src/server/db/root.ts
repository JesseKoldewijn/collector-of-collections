import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

import { env } from "@/env.mjs";
import * as allSchemas from "@/server/db/schemas";

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
  schema: allSchemas,
});
