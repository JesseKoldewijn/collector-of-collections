import { exit } from "process";

import { seedSuperUser } from "./super-user";

/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

const main = async () => {
  const cli_args = process.argv.slice(2);

  const args = new Map<string, string>();

  for (const arg of cli_args) {
    const [key, value] = arg.split("=");
    if (key) {
      args.set(key, value ?? "");
    }
  }

  const superUser = {
    username: args.get("suUn") ?? process.env.SUPER_USER_USERNAME,
    password: args.get("suPw") ?? process.env.SUPER_USER_PASSWORD,
  };

  if (superUser.username && superUser.password) {
    const user = {
      username: superUser.username,
      password: superUser.password,
    };
    await seedSuperUser(user);
  }

  console.log("Seeding complete!");
  exit(0);
};
void main();
