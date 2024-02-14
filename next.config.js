/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  compress: true,
  experimental: {
    serverComponentsExternalPackages: [
      "@node-rs/argon2",
      "@node-rs/bcrypt",
      "oslo",
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/login",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/auth/signup",
        permanent: true,
      },
    ];
  },
};

export default config;
