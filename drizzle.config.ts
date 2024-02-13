import type { Config } from "drizzle-kit";

import { env } from "./src/env.mjs";

const config = {
  schema: "./src/server/db/schema/*.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
} satisfies Config;

export default config;
